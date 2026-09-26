"""In-memory + JSON-file device state. MOCK-safe without hardware or BLE."""

from __future__ import annotations

import json
import logging
import time
from pathlib import Path

from . import config

logger = logging.getLogger("bl-halo-mcp.state")

_STATE_FILE = Path(config.DATA_DIR) / "halo_state.json"
_PHOTOS_DIR = Path(config.DATA_DIR) / "photos"
_LUA_DIR = Path(config.DATA_DIR) / "lua_apps"


def _ensure_dirs() -> None:
    try:
        _STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
        _PHOTOS_DIR.mkdir(parents=True, exist_ok=True)
        _LUA_DIR.mkdir(parents=True, exist_ok=True)
    except Exception:
        logger.warning("Failed to create data dirs", exc_info=True)


def _default_state() -> dict:
    return {
        "connected": False,
        "device": {
            "name": config.DEVICE_NAME,
            "mac": config.DEVICE_MAC or "MOCK:00:00:00:00:00",
            "model": "Halo",
            "firmware": "mock-0.1.0",
            "battery": 87,
            "mock": True,
        },
        "display": {"last_text": "", "last_image": "", "clears": 0, "writes": 0},
        "photos": [],
        "imu": {"accel": [0.0, 0.0, 9.81], "mag": [20.0, 0.5, 44.0], "taps": 0},
        "audio": {"played": 0, "recorded": 0},
        "lua_apps": ["main.lua"],
        "noa": {"queries": 0},
        "events": [],
        "started_at": time.time(),
    }


def load() -> dict:
    _ensure_dirs()
    try:
        if _STATE_FILE.exists():
            return json.loads(_STATE_FILE.read_text(encoding="utf-8"))
    except Exception:
        logger.warning("State read failed, using defaults", exc_info=True)
    state = _default_state()
    save(state)
    return state


def save(state: dict) -> None:
    try:
        _ensure_dirs()
        _STATE_FILE.write_text(json.dumps(state, indent=2), encoding="utf-8")
    except Exception:
        logger.warning("State write failed", exc_info=True)


def log_event(state: dict, kind: str, detail: str) -> None:
    try:
        state.setdefault("events", []).append({"ts": time.time(), "kind": kind, "detail": detail[:500]})
        state["events"] = state["events"][-200:]
    except Exception:
        logger.warning("Event log failed", exc_info=True)


def photos_dir() -> Path:
    _ensure_dirs()
    return _PHOTOS_DIR


def lua_dir() -> Path:
    _ensure_dirs()
    return _LUA_DIR
