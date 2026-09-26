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


def test_lua_crud_roundtrip():
    assert asyncio.run(halo("deploy_lua", text="-- crud", lua_name="crud_app.lua"))["success"] is True
    got = asyncio.run(halo("get_lua", lua_name="crud_app.lua"))
    assert got["success"] is True
    assert "-- crud" in got["result"]["source"]
    missing = asyncio.run(halo("get_lua", lua_name="nope.lua"))
    assert missing["success"] is False
    assert asyncio.run(halo("delete_lua", lua_name="crud_app.lua"))["result"].get("deleted") is True
    assert asyncio.run(halo("get_lua", lua_name="crud_app.lua"))["success"] is False
    assert asyncio.run(halo("delete_lua", lua_name="../evil.lua"))["success"] is False


def test_noa_mock_names_key_path():
    out = asyncio.run(halo("noa_ask", text="What time is it?"))
    assert out["success"] is True
    assert out["result"]["mock"] is True
    assert "NOA_API_KEY" in out["result"]["answer"]


def test_noa_live_path_mocked(monkeypatch):
    import bl_halo_mcp.config as cfg
    import bl_halo_mcp.noa_cloud as cloud

    monkeypatch.setattr(cfg, "NOA_API_KEY", "preview-key")
    monkeypatch.setattr(cloud, "ask_noa", lambda *a, **k: {"answer": "live!", "image_b64": None, "debug": {}})
    out = asyncio.run(halo("noa_ask", text="hi?"))
    assert out["success"] is True
    assert out["result"]["mock"] is False
    assert out["result"]["answer"] == "live!"


def test_noa_cloud_failure_is_error(monkeypatch):
    import bl_halo_mcp.config as cfg
    import bl_halo_mcp.noa_cloud as cloud
    from bl_halo_mcp.noa_cloud import NoaCloudError

    monkeypatch.setattr(cfg, "NOA_API_KEY", "bad-key")

    def boom(*a, **k):
        raise NoaCloudError("HTTP 401: bad key")

    monkeypatch.setattr(cloud, "ask_noa", boom)
    out = asyncio.run(halo("noa_ask", text="hi?"))
    assert out["success"] is False
    assert out["error_type"] == "noa_cloud"
