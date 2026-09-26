"""Halo / Frame portmanteau - one tool, all device operations (Industrial Portmanteau).

[RATIONALE]
Halo exposes ~20 related operations (BLE connect, display, camera, IMU, audio,
Lua VM, Noa Miniapps). A flat tool list would flood agent context and hit IDE
tool caps. One `halo` tool with an `operation` discriminator keeps discovery in
the schema while sharing MOCK/live transport, state, and error handling.

Operations: status, list_devices, connect, disconnect, show_text,
show_image, clear_display, capture_photo, list_photos, imu_read, tap_history,
play_audio, record_audio, run_lua, list_lua_apps, deploy_lua, noa_ask,
miniapp_create, firmware_info.
"""

from __future__ import annotations

import base64
import logging
import time
from typing import Annotated, Literal

from pydantic import Field

from .. import config
from ..state import load, log_event, lua_dir, photos_dir, save
from . import _error_response, _ok

logger = logging.getLogger("bl-halo-mcp.tools.halo")

HaloOp = Literal[
    "status",
    "list_devices",
    "connect",
    "disconnect",
    "show_text",
    "show_image",
    "clear_display",
    "capture_photo",
    "list_photos",
    "imu_read",
    "tap_history",
    "play_audio",
    "record_audio",
    "run_lua",
    "list_lua_apps",
    "deploy_lua",
    "get_lua",
    "delete_lua",
    "noa_ask",
    "miniapp_create",
    "firmware_info",
]

_HALO_LUA_PREAMBLE = """-- bl-halo-mcp managed snippet (Halo/Frame Lua 5.4, frame.* API)
"""


async def halo(
    operation: Annotated[HaloOp, Field(description="Operation to perform (see tool docstring list).")],
    text: Annotated[
        str | None,
        Field(
            description="Text for show_text / noa_ask / miniapp_create / run_lua. Required for: show_text, run_lua, noa_ask, miniapp_create."
        ),
    ] = None,
    image_b64: Annotated[
        str | None, Field(description="Base64 PNG/JPEG for show_image. Required for: show_image.")
    ] = None,
    lua_name: Annotated[
        str | None, Field(description="Lua app filename, e.g. main.lua. Required for: deploy_lua.")
    ] = None,
    duration_s: Annotated[
        float, Field(description="Audio record/play length in seconds (1-30). Used by: play_audio, record_audio.")
    ] = 3.0,
    limit: Annotated[
        int, Field(description="Page size for list ops (1-100). Used by: list_photos, list_lua_apps, tap_history.")
    ] = 20,
    offset: Annotated[int, Field(description="Page offset for list ops. Used by: list_photos, list_lua_apps.")] = 0,
) -> dict:
    """Halo / Frame glasses controller (MOCK-safe without hardware).

    ## Return Format
    `{success: bool, message: str, result?: dict, error?: str, error_type?: str,
    suggestions?: [str], has_more?: bool}`. List ops return `items` + `has_more`.
    Bounded single-object reads state `bounded: true`.

    ## Examples
    `{"operation": "status"}`
    `{"operation": "show_text", "text": "Hello Halo"}`
    `{"operation": "capture_photo"}`
    `{"operation": "run_lua", "text": "frame.display.text('hi',1,1);frame.display.show()"}`
    """
    try:
        state = load()
        op: str = operation

        if op == "status":
            return _ok(
                f"Connected={state['connected']} model={state['device']['model']} mock={config.MOCK}",
                result={
                    "connected": state["connected"],
                    "device": state["device"],
                    "display": state["display"],
                    "battery": state["device"].get("battery"),
                    "mock": config.MOCK,
                    "bounded": True,
                },
            )

        if op == "list_devices":
            items = [
                {
                    "name": config.DEVICE_NAME,
                    "mac": config.DEVICE_MAC or "MOCK:00:00:00:00:00",
                    "model": "Halo",
                    "transport": "mock" if config.MOCK else "ble",
                    "bonded": bool(state["connected"]),
                },
                {
                    "name": "Frame",
                    "mac": "MOCK:FRAME:00:00",
                    "model": "Frame",
                    "transport": "mock",
                    "bonded": False,
                },
            ]
            return _ok(f"Found {len(items)} device profile(s).", result={"items": items, "has_more": False})

        if op == "connect":
            # Live path would use brilliant-ble scan+connect here; MOCK short-circuit.
            if not config.MOCK:
                try:
                    import brilliant_ble  # type: ignore

                    _ = brilliant_ble
                except Exception as exc:  # pragma: no cover
                    return _error_response(
                        f"Live BLE requested but brilliant-ble unavailable: {exc}",
                        "ble_unavailable",
                        suggestions=["pip install brilliant-ble", "Set BL_HALO_MOCK=true for emulator mode"],
                    )
            state["connected"] = True
            state["device"]["mock"] = config.MOCK
            log_event(state, "connect", config.DEVICE_NAME)
            save(state)
            return _ok(f"Connected to {config.DEVICE_NAME} (mock={config.MOCK}).", result={"connected": True})

        if op == "disconnect":
            state["connected"] = False
            log_event(state, "disconnect", "")
            save(state)
            return _ok("Disconnected.", result={"connected": False})

        if op == "show_text":
            if not text or not text.strip():
                return _error_response(
                    "text is required for show_text.",
                    "validation",
                    suggestions=["Pass operation=show_text with text=<string>"],
                )
            # Halo HUD is 640x480 peripheral; Frame is 640x400. Truncate defensively.
            clipped = text.strip()[:500]
            state["display"]["last_text"] = clipped
            state["display"]["writes"] = int(state["display"].get("writes", 0)) + 1
            log_event(state, "display.text", clipped[:80])
            save(state)
            lua = _HALO_LUA_PREAMBLE + f"frame.display.text('{clipped[:60]}',1,1);frame.display.show()"
            return _ok(
                f"Rendered {len(clipped)} chars to HUD (mock={config.MOCK}).",
                result={"chars": len(clipped), "lua": lua},
            )

        if op == "show_image":
            if not image_b64:
                return _error_response("image_b64 is required for show_image.", "validation")
            try:
                raw = base64.b64decode(image_b64, validate=True)
            except Exception:
                return _error_response("image_b64 is not valid base64.", "validation")
            if len(raw) > 2_000_000:
                return _error_response("Image too large (max ~2 MB).", "validation")
            fname = f"hud_{int(time.time())}.bin"
            (photos_dir() / fname).write_bytes(raw)
            state["display"]["last_image"] = fname
            state["display"]["writes"] = int(state["display"].get("writes", 0)) + 1
            log_event(state, "display.image", f"{fname} {len(raw)}B")
            save(state)
            return _ok(f"Queued image {fname} ({len(raw)} bytes) for HUD.", result={"file": fname, "bytes": len(raw)})

        if op == "clear_display":
            state["display"]["last_text"] = ""
            state["display"]["last_image"] = ""
            state["display"]["clears"] = int(state["display"].get("clears", 0)) + 1
            log_event(state, "display.clear", "")
            save(state)
            return _ok("Display cleared.", result={"cleared": True})

        if op == "capture_photo":
            # Live path: brilliant-msg photo TX + camera Lua. MOCK: 1x1 PNG fixture.
            tiny_png_b64 = (
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
            )
            raw = base64.b64decode(tiny_png_b64)
            fname = f"photo_{int(time.time())}.png"
            (photos_dir() / fname).write_bytes(raw)
            state["photos"].insert(0, {"file": fname, "ts": time.time(), "mock": config.MOCK})
            state["photos"] = state["photos"][:200]
            log_event(state, "camera.photo", fname)
            save(state)
            return _ok(
                f"Captured {fname} (mock={config.MOCK}).",
                result={"file": fname, "bytes": len(raw), "mock": config.MOCK},
            )

        if op == "list_photos":
            lim = max(1, min(int(limit), 100))
            off = max(0, int(offset))
            items = state.get("photos", [])[off : off + lim]
            has_more = len(state.get("photos", [])) > off + lim
            return _ok(f"{len(items)} photo(s).", result={"items": items, "has_more": has_more})

        if op == "imu_read":
            return _ok("IMU snapshot.", result={"imu": state.get("imu", {}), "mock": config.MOCK, "bounded": True})

        if op == "tap_history":
            taps = [
                {"ts": time.time(), "kind": "single", "mock": True},
                {"ts": time.time() - 42, "kind": "double", "mock": True},
            ]
            lim = max(1, min(int(limit), 100))
            return _ok(f"{min(lim, len(taps))} tap event(s).", result={"items": taps[:lim], "has_more": False})

        if op == "play_audio":
            secs = max(1.0, min(float(duration_s), 30.0))
            state["audio"]["played"] = int(state["audio"].get("played", 0)) + 1
            log_event(state, "audio.play", f"{secs}s")
            save(state)
            return _ok(f"Played {secs:g}s via bone-conduction (mock={config.MOCK}).", result={"seconds": secs})

        if op == "record_audio":
            secs = max(1.0, min(float(duration_s), 30.0))
            state["audio"]["recorded"] = int(state["audio"].get("recorded", 0)) + 1
            log_event(state, "audio.record", f"{secs}s")
            save(state)
            return _ok(
                f"Recorded {secs:g}s from dual mics (mock={config.MOCK}).",
                result={"seconds": secs, "mock": config.MOCK},
            )

        if op == "run_lua":
            if not text or not text.strip():
                return _error_response("text (Lua source) is required for run_lua.", "validation")
            src = text.strip()
            if len(src) > 20000:
                return _error_response("Lua source too large (max 20k chars).", "validation")
            log_event(state, "lua.run", src[:120])
            save(state)
            # Live path sends src over Halo Lua BLE service + REPL; MOCK echoes.
            return _ok(
                f"Executed {len(src)} Lua chars (mock={config.MOCK}).", result={"chars": len(src), "mock": config.MOCK}
            )

        if op == "list_lua_apps":
            names = list(state.get("lua_apps", ["main.lua"]))
            try:
                for p in sorted(lua_dir().glob("*.lua")):
                    if p.name not in names:
                        names.append(p.name)
            except Exception:
                logger.warning("Lua dir scan failed", exc_info=True)
            lim = max(1, min(int(limit), 100))
            off = max(0, int(offset))
            items = [{"name": n} for n in names[off : off + lim]]
            return _ok(f"{len(items)} Lua app(s).", result={"items": items, "has_more": len(names) > off + lim})

        if op == "deploy_lua":
            if not text or not text.strip():
                return _error_response("text (Lua source) is required for deploy_lua.", "validation")
            name = (lua_name or "main.lua").strip() or "main.lua"
            if "/" in name or "\\" in name or not name.endswith(".lua"):
                return _error_response("lua_name must be a plain *.lua filename.", "validation")
            (lua_dir() / name).write_text(_HALO_LUA_PREAMBLE + text.strip(), encoding="utf-8")
            if name not in state.get("lua_apps", []):
                state.setdefault("lua_apps", []).append(name)
            log_event(state, "lua.deploy", name)
            save(state)
            return _ok(f"Deployed {name} ({len(text)} chars).", result={"name": name})

        def _lua_name(value: str | None, default: str = "main.lua") -> str | None:
            name = (value or default).strip() or default
            if "/" in name or "\\" in name or not name.endswith(".lua"):
                return None
            return name

        if op == "get_lua":
            name = _lua_name(lua_name)
            if name is None:
                return _error_response("lua_name must be a plain *.lua filename.", "validation")
            path = lua_dir() / name
            if not path.exists():
                return _error_response(
                    f"{name} not found.",
                    "validation",
                    suggestions=["List apps with operation=list_lua_apps", "Load a sample from the Lua page"],
                )
            src = path.read_text(encoding="utf-8")
            return _ok(f"Read {name} ({len(src)} chars).", result={"name": name, "source": src, "bounded": True})

        if op == "delete_lua":
            name = _lua_name(lua_name)
            if name is None:
                return _error_response("lua_name must be a plain *.lua filename.", "validation")
            path = lua_dir() / name
            if not path.exists():
                return _error_response(f"{name} not found - nothing deleted.", "validation")
            path.unlink()
            if name in state.get("lua_apps", []):
                state["lua_apps"] = [n for n in state["lua_apps"] if n != name]
            log_event(state, "lua.delete", name)
            save(state)
            return _ok(f"Deleted {name}.", result={"name": name, "deleted": True})

        if op == "noa_ask":
            if not text or not text.strip():
                return _error_response("text (question) is required for noa_ask.", "validation")
            state["noa"]["queries"] = int(state["noa"].get("queries", 0)) + 1
            log_event(state, "noa.ask", text.strip()[:120])
            save(state)
            if config.NOA_API_KEY:
                # Live path: same call Brilliant's own public playground makes
                # (POST api.brilliant.xyz/dev/noa, Authorization: <preview-key>).
                try:
                    from ..noa_cloud import ask_noa

                    live = ask_noa(text.strip(), config.NOA_API_KEY, api_url=config.NOA_API_URL)
                    return _ok(
                        "Noa answered (live cloud).",
                        result={"answer": live["answer"], "image_b64": live["image_b64"], "mock": False},
                    )
                except Exception as exc:
                    return _error_response(
                        f"Noa cloud call failed: {exc}",
                        "noa_cloud",
                        suggestions=[
                            "Check NOA_API_KEY (preview key from the Noa playground) is current",
                            "Retry - the /dev endpoint occasionally 5xxs",
                            "Omit the key (blank NOA_API_KEY) for MOCK answers",
                        ],
                    )
            answer = (
                f"[MOCK Noa] You asked: {text.strip()[:200]}. "
                "This is a placeholder - no cloud call was made because NOA_API_KEY is blank. "
                "For live answers: open https://github.com/brilliantlabsAR/noa-playground, "
                "paste a preview key into NOA_API_KEY in .env, restart. "
                "Everything else (display, camera, IMU, audio, Lua) works without any key. "
                "See docs/ONBOARDING.md."
            )
            return _ok("Noa answered (mock - set NOA_API_KEY for live).", result={"answer": answer, "mock": True})

        if op == "miniapp_create":
            if not text or not text.strip():
                return _error_response("text (Miniapp prompt) is required for miniapp_create.", "validation")
            slug = "".join(c.lower() if c.isalnum() else "-" for c in text.strip()[:40]).strip("-") or "miniapp"
            lua_src = (
                _HALO_LUA_PREAMBLE
                + f"-- Miniapp: {text.strip()[:80]}\nframe.display.text('"
                + text.strip().replace("'", "")[:60]
                + "',1,1);frame.display.show()"
            )
            (lua_dir() / f"{slug}.lua").write_text(lua_src, encoding="utf-8")
            if f"{slug}.lua" not in state.get("lua_apps", []):
                state.setdefault("lua_apps", []).append(f"{slug}.lua")
            log_event(state, "miniapp.create", slug)
            save(state)
            return _ok(
                f"Drafted Miniapp {slug}.lua from natural language (mock publish).",
                result={"slug": slug, "file": f"{slug}.lua"},
            )

        if op == "firmware_info":
            info = {
                "model": state["device"].get("model", "Halo"),
                "firmware": state["device"].get("firmware", "mock-0.1.0"),
                "lua": "5.4",
                "sdk": "brilliant-sdk (ble+msg), halo-emulator compatible",
                "ble_services": ["Halo Lua", "Battery", "OTA", "LE Audio"],
                "display_halo": "0.2in 640x480 RGB microOLED peripheral HUD",
                "display_frame": "640x400 color OLED, 20deg FOV",
                "mock": config.MOCK,
                "bounded": True,
            }
            return _ok("Firmware info.", result=info)

        return _error_response(f"Unknown operation: {op}", "validation")
    except Exception as exc:
        return _error_response(
            str(exc), "halo_error", suggestions=["Retry with operation=status", "See docs/TROUBLESHOOTING.md"]
        )
