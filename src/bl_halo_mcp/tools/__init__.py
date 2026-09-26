"""Shared helpers - auto-logging error responses (fleet hardening pattern 3)."""

from __future__ import annotations

import logging

logger = logging.getLogger("bl-halo-mcp.tools")


def _error_response(error: str, error_type: str = "general", **kwargs) -> dict:
    """Auto-logging error response - traceback logged before returning."""
    logger.exception("Tool error: %s [%s]", error, error_type)
    out: dict = {"success": False, "error": error, "error_type": error_type}
    out.update(kwargs)
    return out


def _ok(message: str, **kwargs) -> dict:
    out: dict = {"success": True, "message": message}
    out.update(kwargs)
    return out
