# bl-halo-mcp

[![CI](https://github.com/sandraschi/bl-halo-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/sandraschi/bl-halo-mcp/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11%2B-blue.svg)](pyproject.toml)
[![FastMCP](https://img.shields.io/badge/FastMCP-3.x-green.svg)](pyproject.toml)
[![Noa cloud](https://img.shields.io/badge/Noa-live%20with%20key-blueviolet.svg)](docs/ONBOARDING.md)

![Brilliant Labs Halo AI smart glasses](https://brilliant.xyz/cdn/shop/files/Halo_1.png?v=1753738731)

Fleet MCP wrapper for **Brilliant Labs Halo** smart glasses (2025 successor to **Frame** 2024). Open-source AI glasses: ~40 g wayfarer, 0.2 in 640x480 RGB microOLED peripheral HUD, low-power camera, dual mics + bone-conduction audio, IMU + taps/clicks, NPU SoC, Lua 5.4 `frame.*` VM over BLE, Noa companion AI with Narrative memory + natural-language Miniapps.

## How it runs

Headless default: FastMCP stdio (`uv run python -m bl_halo_mcp.server`) + Starlette REST (11976) + Vite dashboard (11977). MOCK mode needs no hardware. Live needs BLE + paired Halo/Frame + Noa app.

Hands-in: display write, photo capture, Lua deploy, Noa ask. Hands-out: BLE pairing, firmware flash, store publish (drafts only here).

## Hardware (open, documented)

Halo is fully documented open hardware: Balletto B1 (Cortex-M55 + Ethos-U55 NPU),
VGA global-shutter camera, dual mics, bone-conduction audio, tap-interrupt IMU,
300 mAh - see [docs/HARDWARE.md](docs/HARDWARE.md) and the dashboard **Hardware**
page with a 3D viewer for Brilliant's official full-assembly STL
(`docs.brilliant.xyz/halo/halo.stl`). No official CAD sources or firmware repo
exist yet (both "coming soon" upstream) - anything claiming otherwise is wrong.

## Status: alive, small-batch (not dead, not Meta)

First Halo units shipped Aug 2026 after a bumpy ramp (production dates slipped
repeatedly through H1 2026 - hinge/plastics tweaks, holiday shutdowns). Limited
quantities, direct sale via brilliant.xyz ($299 pre-launch, now $349-399).
Frame is discontinued/sold out. Company active: 2026 partnerships (Alif, Neuphonic,
TheStage AI, Liquid AI), maintained docs/SDK/firmware.

Supply chain is China-centered (Brilliant has not named the assembly factory;
schedules move with Chinese holidays; Far-East suppliers include Guozhao
display, QST compass, Grepow cells). Design in Singapore/HK, fabless global BOM,
assembly in China - the standard small-batch open-hardware play. Consequence for
this repo: MOCK-first + emulator is the primary dev path for most people; live
hardware is a bonus, not the baseline.

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

- `halo_device` - 21-op portmanteau (status, connect, show_text/image, photo, IMU, audio, Lua CRUD, Noa, Miniapp, firmware)
- `halo_dashboard` - Prefab App status card
- `halo_help`, `halo_shutdown` - help + guarded disconnect
- Resource `skill://halo-dev/SKILL.md`, prompt `halo_recipe`

Upstream: docs `https://docs.brilliant.xyz`, SDK `https://github.com/brilliantlabsAR/brilliant_sdk`, Noa `https://github.com/brilliantlabsAR/noa-flutter`.
