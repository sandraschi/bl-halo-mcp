"""Smoke tests - MOCK mode, no hardware/BLE required."""

import asyncio

from bl_halo_mcp.tools.halo import halo


def test_status():
    out = asyncio.run(halo("status"))
    assert out["success"] is True
    assert "result" in out


def test_show_and_clear():
    assert asyncio.run(halo("show_text", text="Hello Halo"))["success"] is True
    assert asyncio.run(halo("clear_display"))["success"] is True


def test_photo_and_lists():
    assert asyncio.run(halo("capture_photo"))["success"] is True
    photos = asyncio.run(halo("list_photos", limit=5))
    assert photos["success"] is True
    assert "has_more" in photos["result"]
    lua = asyncio.run(halo("list_lua_apps"))
    assert lua["success"] is True


def test_lua_and_noa():
    assert asyncio.run(halo("run_lua", text="frame.display.text('hi',1,1)"))["success"] is True
    assert asyncio.run(halo("deploy_lua", text="-- app", lua_name="test_app.lua"))["success"] is True
    assert asyncio.run(halo("noa_ask", text="What time is it?"))["success"] is True
    assert asyncio.run(halo("miniapp_create", text="bus times card"))["success"] is True


def test_validation():
    out = asyncio.run(halo("show_text", text=""))
    assert out["success"] is False
    assert out["error_type"] == "validation"
