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
            description="One of: status, list_devices, connect, disconnect, show_text, show_image, clear_display, capture_photo, list_photos, imu_read, tap_history, play_audio, record_audio, run_lua, list_lua_apps, deploy_lua, noa_ask, miniapp_create, firmware_info."
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
            content=content,
            data={
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
        str | None, Field(description="Focus: pairing, lua, display, noa, ble. Omit for overview.")
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
        "pairing": "Charge Halo, hold pairing 3s, Noa app connect+pair. MOCK needs nothing.",
        "lua": "On-device Lua 5.4 frame.* API. Use run_lua / deploy_lua. Emulator: pip install halo-emulator.",
        "display": "Halo 640x480 peripheral HUD; Frame 640x400. show_text/show_image/clear_display.",
        "noa": "Noa companion app + Narrative memory + Miniapps. noa_ask is MOCK until paired.",
        "ble": "Services: Halo Lua, Battery, OTA, LE Audio. Python: brilliant-ble/brilliant-msg.",
    }
    key = (topic or "overview").lower()
    text = texts.get(
        key, "halo_device ops: status, connect, show_text, capture_photo, run_lua, noa_ask, ... See docs/TOOLS.md."
    )
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
