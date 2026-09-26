# Development - bl-halo-mcp

## Loop

```powershell
uv sync --extra dev
uv run pytest -q
uv run ruff check .; uv run ruff format --check .
.\start.ps1
```

Backend: `uv run python -m bl_halo_mcp.api` (11976). MCP stdio: `uv run python -m bl_halo_mcp.server`.
Frontend: `cd web_sota; npm i; npm run dev -- --port 11977`.

## Layout

- `src/bl_halo_mcp/server.py` - FastMCP tools (halo_device, halo_dashboard app=True, halo_help, halo_shutdown).
- `src/bl_halo_mcp/tools/halo.py` - portmanteau implementation (MOCK/live split).
- `src/bl_halo_mcp/api.py` - Starlette REST, explicit CORS, no Pydantic.
- `src/bl_halo_mcp/state.py` - JSON state in `data/`.
- `web_sota/` - Vite React catch-them-all dashboard.
- `skills/halo-dev/SKILL.md` - agent skill.

## Live BLE

Set `BL_HALO_MOCK=false` + MAC, `pip install brilliant-sdk`. Code paths try `brilliant_ble`
import first and fall back to a clear `ble_unavailable` error (never silent).

## Onboarding: N/A rationale

Not applicable - wrappee (Halo/Frame hardware + Noa account) exists, so onboarding is mandatory. See `docs/ONBOARDING.md`.
