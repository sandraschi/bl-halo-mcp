# bl-halo-mcp

Fleet MCP wrapper for **Brilliant Labs Halo** smart glasses (2025 successor to **Frame** 2024). Open-source AI glasses: ~40 g wayfarer, 0.2 in 640x480 RGB microOLED peripheral HUD, low-power camera, dual mics + bone-conduction audio, IMU + taps/clicks, NPU SoC, Lua 5.4 `frame.*` VM over BLE, Noa companion AI with Narrative memory + natural-language Miniapps.

## How it runs

Headless default: FastMCP stdio (`uv run python -m bl_halo_mcp.server`) + Starlette REST (11976) + Vite dashboard (11977). MOCK mode needs no hardware. Live needs BLE + paired Halo/Frame + Noa app.

Hands-in: display write, photo capture, Lua deploy, Noa ask. Hands-out: BLE pairing, firmware flash, store publish (drafts only here).

## Quick start

```powershell
Copy-Item .env.example .env
uv sync --extra dev
uv run pytest -q
.\start.ps1
```

> **First time?** Complete [docs/ONBOARDING.md](docs/ONBOARDING.md) before expecting live host calls.

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/ONBOARDING.md](docs/ONBOARDING.md) | Onboarding (mandatory: Halo/Frame, BLE, emulator, Noa costs) |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | Env + ports |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Dev loop |
| [docs/TOOLS.md](docs/TOOLS.md) | Tool reference |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Fixes |

Backend health: `http://127.0.0.1:11976/api/health`. Ports 11976/11977 registered in fleet `WEBAPP_PORTS.md`.

## MCP tools (implemented)

- `halo_device` - 19-op portmanteau (status, connect, show_text/image, photo, IMU, audio, Lua, Noa, Miniapp, firmware)
- `halo_dashboard` - Prefab App status card
- `halo_help`, `halo_shutdown` - help + guarded disconnect
- Resource `skill://halo-dev/SKILL.md`, prompt `halo_recipe`

Upstream: docs `https://docs.brilliant.xyz`, SDK `https://github.com/brilliantlabsAR/brilliant_sdk`, Noa `https://github.com/brilliantlabsAR/noa-flutter`.
