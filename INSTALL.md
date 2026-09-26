# INSTALL - bl-halo-mcp

> **First time?** Complete [docs/ONBOARDING.md](docs/ONBOARDING.md) before expecting live host calls.

## Option A - naked PC (double-click)

1. Install uv: `winget install astral-sh.uv`
2. Double-click `start.bat` (runs `start.ps1`, clears 11976/11977, syncs, launches backend + frontend).

## Option B - PowerShell

```powershell
Copy-Item .env.example .env
uv sync --extra dev
.\start.ps1
# BackendOnly: .\start.ps1 -BackendOnly
```

## Option C - manual

```powershell
uv sync --extra dev
uv run python -m bl_halo_mcp.api      # 11976
cd web_sota; npm i; npm run dev -- --port 11977
```

## Option D - MCP client only

```json
{"mcpServers": {"bl-halo": {"command": "uv", "args": ["--directory", "D:\\Dev\\repos\\bl-halo-mcp", "run", "python", "-m", "bl_halo_mcp.server"], "env": {"BL_HALO_MOCK": "true"}}}}
```

Requires: Windows 10/11, Python 3.11+, BLE for live. MOCK needs nothing else.
