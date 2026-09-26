"""FastMCP server - Halo/Frame bridge (stdio + HTTP via run_server). Stateless over JSON state file."""

from __future__ import annotations

import logging
from typing import Annotated

from fastmcp import FastMCP
from pydantic import Field

from .tools.halo import halo

logger = logging.getLogger("bl-halo-mcp.server")

mcp = FastMCP("bl-halo-mcp")

_RESULT_SCHEMA: dict = {"type": "object"}


@mcp.tool(annotations={"readonly": True}, output_schema=_RESULT_SCHEMA)
async def halo_device(
    operation: Annotated[
        str,
        Field(
            description="One of: status, list_devices, connect, disconnect, show_text, show_image, clear_display, capture_photo, list_photos, imu_read, tap_history, play_audio, record_audio, run_lua, list_lua_apps, deploy_lua, get_lua, delete_lua, noa_ask, miniapp_create, firmware_info."
        ),
    ],
    text: Annotated[
        str | None,
        Field(
            description="Text / Lua source / question. Required for: show_text, run_lua, deploy_lua, noa_ask, miniapp_create."
        ),
    ] = None,
    image_b64: Annotated[str | None, Field(description="Base64 image. Required for: show_image.")] = None,
    lua_name: Annotated[str | None, Field(description="Lua filename. Required for: deploy_lua.")] = None,
    duration_s: Annotated[float, Field(description="Audio seconds (1-30). Used by: play_audio, record_audio.")] = 3.0,
    limit: Annotated[
        int, Field(description="Page size (1-100). Used by: list_photos, list_lua_apps, tap_history.")
    ] = 20,
    offset: Annotated[int, Field(description="Page offset. Used by: list_photos, list_lua_apps.")] = 0,
) -> dict:
    """Halo / Frame glasses controller (portmanteau).

    ## Return Format
    `{success, message, result?, error?, suggestions?, has_more?}`.

    ## Examples
    `await halo_device("status")`
    `await halo_device("show_text", text="Hello Halo")`
    `await halo_device("capture_photo")`
    """
    return await halo(
        operation=operation,  # type: ignore[arg-type]
        text=text,
        image_b64=image_b64,
        lua_name=lua_name,
        duration_s=duration_s,
        limit=limit,
        offset=offset,
    )


@mcp.tool(app=True, annotations={"readonly": True}, output_schema=_RESULT_SCHEMA)
async def halo_dashboard() -> dict:
    """Halo status dashboard (Prefab App).

    ## Return Format
    `{success, message, app}` where app renders device, battery, display, counts.

    ## Examples
    `await halo_dashboard()`
    """
    from . import config as cfg
    from .state import load

    state = load()
    content = (
        f"Halo {state['device'].get('model')} connected={state['connected']} "
        f"battery={state['device'].get('battery')}% mock={cfg.MOCK}"
    )
    try:
        from prefab_ui import PrefabApp

        app = PrefabApp(
            title="Halo Dashboard",
            mode="dark",
            state={
                "summary": content,
                "connected": state["connected"],
                "device": state["device"],
                "display": state["display"],
                "photos": len(state.get("photos", [])),
                "lua_apps": state.get("lua_apps", []),
            },
        )
        return {"success": True, "message": content, "app": app}
    except Exception:
        logger.exception("Prefab render failed, falling back to text")
        return {"success": True, "message": content, "content": content}


@mcp.tool(annotations={"readonly": True}, output_schema=_RESULT_SCHEMA)
async def halo_help(
    topic: Annotated[
        str | None,
        Field(description="Focus: pairing, lua, display, noa, ble, hardware. Omit for the capability-matrix overview."),
    ] = None,
) -> dict:
    """Halo help - operations, BLE pairing, Lua, Noa.

    ## Return Format
    `{success, message, result: {topic, text}}`.

    ## Examples
    `await halo_help()`
    `await halo_help("lua")`
    """
    texts = {
        "overview": (
            "WHAT WORKS WITHOUT WHAT. Tier 0 (nothing needed): MOCK mode rehearses every op - "
            "display writes are logged, photos are fixtures, Noa answers are placeholders. "
            "Tier 1 (Halo/Frame in BLE range, BL_HALO_MOCK=false): everything local is REAL - "
            "show_text/show_image, capture_photo, imu_read, tap_history, play/record_audio, "
            "run_lua/deploy_lua. No account, no cloud, no key. "
            "Tier 2 (Noa cloud key): only noa_ask needs it - set NOA_API_KEY to a preview key "
            "from github.com/brilliantlabsAR/noa-playground and it calls api.brilliant.xyz live. "
            "Ops: status, list_devices, connect, disconnect, show_text, show_image, clear_display, "
            "capture_photo, list_photos, imu_read, tap_history, play_audio, record_audio, run_lua, "
            "list_lua_apps, deploy_lua, get_lua, delete_lua, noa_ask, miniapp_create, firmware_info. "
            "Topics: pairing, lua, display, noa, ble, hardware. Full guide: docs/ONBOARDING.md."
        ),
        "pairing": (
            "Charge Halo, hold the under-arm button 3s for pairing, connect+pair in the Noa app "
            "(login runs through api.brilliant.xyz). Then set BL_HALO_MOCK=false plus "
            "BL_HALO_DEVICE_MAC and restart; halo_device(connect) bonds. Keep phone/PC within 3m. "
            "Noa app account is free with daily caps - needed for Tier-2 answers only."
        ),
        "lua": (
            "On-device Lua 5.4 frame.* API (Zephyr OS). run_lua executes <=20k chars, deploy_lua saves "
            "plain *.lua files, list_lua_apps inventories them. Halo draws IMMEDIATELY - no show() "
            "call needed (Frame needs it; sending it on Halo is a harmless no-op). No hardware? "
            "pip install halo-emulator && halo-emulator ./my_app/ runs the same Lua."
        ),
        "display": (
            "Halo panel is 640x480 RGB microOLED but the drawable area is 256x256 - keep HUD text "
            "under ~140 chars for glanceability (hard cap 500). Draws take effect immediately. "
            "Frame is 640x400 with 20deg FOV and needs show(). show_image takes base64 PNG/JPEG <=2MB."
        ),
        "noa": (
            "noa_ask WITHOUT a key returns a labeled MOCK placeholder - by design, not broken. "
            "Live path: POST https://api.brilliant.xyz/dev/noa with header 'Authorization: <key>' "
            "(raw token, no Bearer), multipart fields prompt/messages/image/experimental/time/location. "
            "Get a preview key from the Noa playground repo (API key box), put it in NOA_API_KEY, restart. "
            "Unofficial integration copied from Brilliant's own public playground code - endpoint may move. "
            "Bad/expired key returns error_type noa_cloud (never silent mock). "
            "Alternative: Noa mobile app account. Narrative memory + Miniapps live in the app, not here; "
            "miniapp_create only drafts *.lua from natural language."
        ),
        "ble": (
            "Halo is a BLE 5.3 peripheral: services Halo Lua, Battery, OTA, LE Audio. "
            "Python: pip install brilliant-sdk (brilliant-ble transport + brilliant-msg types). "
            "Host app drives logic, glass runs the Lua event loop - there is no on-glass app store. "
            "OTA works via MCUboot; custom firmware needs destructive disassembly (don't)."
        ),
        "hardware": (
            "Balletto B1 (Alif): Cortex-M55 + Ethos-U55 NPU, 1.8MB MRAM, 2MB SRAM, Zephyr OS. "
            "Camera PAG7982J1 VGA global shutter 81deg. Dual TDK T5838 mics (AAD wake). "
            "Bone-conduction speakers via TI TPA2011D1. IMU BMA580 accel (tap interrupts) + QMC6308 compass. "
            "2x150mAh cells (300mAh), BQ25170 charger, magnetic USB-C. ~40g. "
            "Official full-assembly STL: docs.brilliant.xyz/halo/halo.stl - open the Hardware page "
            "in this dashboard for the 3D viewer. Full manual: docs.brilliant.xyz/halo/hardware."
        ),
    }
    key = (topic or "overview").lower()
    text = texts.get(key, texts["overview"])
    return {"success": True, "message": text, "result": {"topic": key, "text": text}}


@mcp.tool(annotations={}, output_schema=_RESULT_SCHEMA)
async def halo_shutdown(
    confirm: Annotated[bool, Field(description="Must be true to disconnect.")] = False,
) -> dict:
    """Disconnect Halo (destructive-guarded).

    ## Return Format
    `{success, message, result?}`.

    ## Examples
    `await halo_shutdown(confirm=True)`
    """
    if not confirm:
        return {"success": False, "error": "Pass confirm=True to disconnect.", "error_type": "validation"}
    from .state import load, save

    state = load()
    state["connected"] = False
    save(state)
    return {"success": True, "message": "Halo disconnected.", "result": {"connected": False}}


@mcp.resource("skill://halo-dev/SKILL.md")
async def halo_skill() -> str:
    from pathlib import Path

    p = Path(__file__).resolve().parents[2] / "skills" / "halo-dev" / "SKILL.md"
    return (
        p.read_text(encoding="utf-8")
        if p.exists()
        else "# halo-dev\nUse halo_device status/show_text/capture_photo/run_lua."
    )


@mcp.prompt()
def halo_recipe(goal: str) -> str:
    return f"Halo recipe for: {goal}. 1) halo_device(status) 2) connect 3) show_text/run_lua 4) capture_photo verify."


def main() -> None:
    mcp.run()


if __name__ == "__main__":
    main()
