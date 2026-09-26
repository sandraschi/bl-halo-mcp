"""Starlette REST backend (no Pydantic) + FastMCP `/mcp` mount with lifespan wiring."""

from __future__ import annotations

import json
import logging
import subprocess
import time
import urllib.request
from contextlib import asynccontextmanager

from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from starlette.routing import Route

from . import config
from .server import mcp
from .state import load, log_event, save
from .tools.halo import halo

logger = logging.getLogger("bl-halo-mcp.api")
_START = time.time()

mcp_app = mcp.http_app(path="/")


@asynccontextmanager
async def lifespan(app: Starlette):
    load()  # shallow state probe (startup gate: state file must read)
    async with mcp_app.router.lifespan_context(app):
        yield


async def _health(request):
    state = load()
    return JSONResponse(
        {
            "ok": True,
            "service": "bl-halo-mcp",
            "backend_port": config.BACKEND_PORT,
            "frontend_port": config.FRONTEND_PORT,
            "connected": state["connected"],
            "instance_configured": state["connected"] or config.MOCK,
            "mock": config.MOCK,
            "device": state["device"],
            "uptime_s": round(time.time() - _START, 1),
        }
    )


async def _dashboard(request):
    state = load()
    return JSONResponse(
        {
            "connected": state["connected"],
            "device": state["device"],
            "display": state["display"],
            "photos": len(state.get("photos", [])),
            "lua_apps": state.get("lua_apps", []),
            "audio": state.get("audio", {}),
            "noa_queries": state.get("noa", {}).get("queries", 0),
            "mock": config.MOCK,
        }
    )


async def _tools(request):
    return JSONResponse(
        {
            "tools": [
                {"name": "halo_device", "kind": "portmanteau", "ops": 19},
                {"name": "halo_dashboard", "kind": "prefab-app"},
                {"name": "halo_help", "kind": "solo"},
                {"name": "halo_shutdown", "kind": "solo"},
            ]
        }
    )


async def _skills(request):
    return JSONResponse({"skills": [{"name": "halo-dev", "uri": "skill://halo-dev/SKILL.md"}]})


async def _skill_read(request):
    from pathlib import Path

    name = request.path_params.get("name", "halo-dev")
    p = Path(__file__).resolve().parents[2] / "skills" / name / "SKILL.md"
    if not p.exists():
        return JSONResponse({"error": "not found"}, status_code=404)
    return JSONResponse({"name": name, "markdown": p.read_text(encoding="utf-8")})


async def _devices(request):
    state = load()
    return JSONResponse(
        {
            "items": [
                {"name": config.DEVICE_NAME, "model": "Halo", "connected": state["connected"]},
                {"name": "Frame", "model": "Frame", "connected": False},
            ],
            "has_more": False,
        }
    )


async def _photos(request):
    state = load()
    try:
        limit = max(1, min(int(request.query_params.get("limit", 20)), 100))
        offset = max(0, int(request.query_params.get("offset", 0)))
    except ValueError:
        return JSONResponse({"error": "limit/offset must be integers"}, status_code=400)
    photos = state.get("photos", [])
    return JSONResponse({"items": photos[offset : offset + limit], "has_more": len(photos) > offset + limit})


async def _halo_action(request):
    try:
        body = await request.json()
    except Exception:
        return JSONResponse({"error": "JSON body required"}, status_code=400)
    if not isinstance(body, dict) or not body.get("operation"):
        return JSONResponse({"error": "operation is required"}, status_code=400)
    try:
        out = await halo(
            operation=body["operation"],
            text=body.get("text"),
            image_b64=body.get("image_b64"),
            lua_name=body.get("lua_name"),
            duration_s=float(body.get("duration_s", 3.0)),
            limit=int(body.get("limit", 20)),
            offset=int(body.get("offset", 0)),
        )
    except (ValueError, TypeError):
        return JSONResponse({"error": "duration_s/limit/offset must be numbers"}, status_code=400)
    return JSONResponse(out)


async def _shutdown(request):
    try:
        body = await request.json()
    except Exception:
        body = {}
    if not isinstance(body, dict) or body.get("confirm") is not True:
        return JSONResponse({"error": "Pass confirm=true to disconnect."}, status_code=400)
    state = load()
    state["connected"] = False
    log_event(state, "disconnect", "via REST")
    save(state)
    return JSONResponse({"success": True, "message": "Halo disconnected.", "result": {"connected": False}})


async def _logs(request):
    state = load()
    return JSONResponse({"items": state.get("events", [])[-100:], "has_more": False})


def _providers_payload() -> dict:
    return {
        "providers": [
            {
                "id": "ollama",
                "label": "Ollama (local)",
                "kind": "local",
                "base_url": "http://127.0.0.1:11434",
                "needs_key": False,
                "configured": False,
                "detected": False,
            },
            {
                "id": "lmstudio",
                "label": "LM Studio (local)",
                "kind": "local",
                "base_url": "http://127.0.0.1:1234",
                "needs_key": False,
                "configured": False,
            },
            {
                "id": "noa",
                "label": "Noa (Halo companion, via app)",
                "kind": "device",
                "base_url": "",
                "needs_key": False,
                "configured": load()["connected"],
            },
        ]
    }


async def _llm_providers(request):
    return JSONResponse(_providers_payload())


async def _llm_discover(request):
    payload = _providers_payload()
    payload["source"] = "curated"
    return JSONResponse(payload)


async def _llm_models(request):
    return JSONResponse({"models": [], "source": "curated"})


async def _llm_gpus(request):
    gpus: list[dict] = []
    try:
        proc = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True, timeout=10, check=False)
        for i, line in enumerate(proc.stdout.splitlines()):
            line = line.strip()
            if line.startswith("GPU "):
                gpus.append({"index": i, "name": line})
    except Exception:
        logger.debug("nvidia-smi probe unavailable", exc_info=True)
    return JSONResponse({"gpus": gpus})


async def _llm_chat(request):
    try:
        body = await request.json()
    except Exception:
        body = {}
    prompt = str(body.get("message", body.get("prompt", "")))[:2000]
    if not prompt:
        return JSONResponse({"error": "message required"}, status_code=400)
    # Backend proxy only; no direct browser-to-provider. MOCK answer when no local LLM.
    answer = f"[bl-halo-mcp] No local LLM detected; start Ollama (11434) for live chat. Echo: {prompt[:300]}"
    # Best-effort Ollama passthrough (3s timeout), else mock echo.
    try:
        req = urllib.request.Request(
            "http://127.0.0.1:11434/api/generate",
            data=json.dumps({"model": "gemma3:4b", "prompt": prompt[:1000], "stream": False}).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            if data.get("response"):
                answer = str(data["response"])[:4000]
    except Exception:
        logger.debug("Ollama passthrough unavailable", exc_info=True)
    return JSONResponse({"answer": answer, "mock": True})


routes = [
    Route("/api/health", _health),
    Route("/api/dashboard", _dashboard),
    Route("/api/tools", _tools),
    Route("/api/skills", _skills),
    Route("/api/skills/{name}", _skill_read),
    Route("/api/devices", _devices),
    Route("/api/photos", _photos),
    Route("/api/halo", _halo_action, methods=["POST"]),
    Route("/api/shutdown", _shutdown, methods=["POST"]),
    Route("/api/logs", _logs),
    Route("/api/llm/providers", _llm_providers),
    Route("/api/llm/discover", _llm_discover),
    Route("/api/llm/models", _llm_models),
    Route("/api/llm/gpus", _llm_gpus),
    Route("/api/llm/chat", _llm_chat, methods=["POST"]),
]


class _CorsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        allowed = {
            "http://127.0.0.1:11977",
            "http://localhost:11977",
            "http://127.0.0.1:11976",
            "http://localhost:11976",
            "http://tauri.localhost",
        }
        origin = request.headers.get("origin", "")
        resp = await call_next(request)
        if origin in allowed:
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Access-Control-Allow-Methods"] = "GET,POST,DELETE,OPTIONS"
            resp.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        return resp


app = Starlette(routes=routes, middleware=[Middleware(_CorsMiddleware)], lifespan=lifespan)
app.mount("/mcp", mcp_app)


def main() -> None:
    import uvicorn

    logging.basicConfig(level=logging.INFO)
    uvicorn.run(app, host="127.0.0.1", port=config.BACKEND_PORT)


if __name__ == "__main__":
    main()
