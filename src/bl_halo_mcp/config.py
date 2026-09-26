"""Central config - env-first, no hardcoded ports in code paths."""

from __future__ import annotations

import os


def _int(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, str(default)).strip() or str(default))
    except ValueError:
        return default


BACKEND_PORT = _int("BL_HALO_BACKEND_PORT", _int("WEB_PORT", 11976))
FRONTEND_PORT = _int("BL_HALO_FRONTEND_PORT", _int("VITE_PORT", 11977))
MOCK = os.environ.get("BL_HALO_MOCK", "true").strip().lower() in {"1", "true", "yes", "on"}
DEVICE_MAC = os.environ.get("BL_HALO_DEVICE_MAC", "").strip()
DEVICE_NAME = os.environ.get("BL_HALO_DEVICE_NAME", "Halo").strip() or "Halo"
API_URL = os.environ.get("BL_HALO_API_URL", f"http://127.0.0.1:{BACKEND_PORT}").strip()
DATA_DIR = os.environ.get("BL_HALO_DATA_DIR", "data").strip() or "data"
