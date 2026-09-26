# Tools - bl-halo-mcp

All implemented, no stubs. MOCK-safe.

| Tool | Ops |
|------|-----|
| `halo_device` (portmanteau) | status, list_devices, connect, disconnect, show_text, show_image, clear_display, capture_photo, list_photos (limit/offset/has_more), imu_read, tap_history, play_audio, record_audio, run_lua, list_lua_apps, deploy_lua, noa_ask, miniapp_create, firmware_info |
| `halo_dashboard` (app=True Prefab) | Status card: device, battery, display, counts |
| `halo_help` | topic: pairing, lua, display, noa, ble |
| `halo_shutdown` | Guarded disconnect (confirm=True) |

REST: `GET /api/health|dashboard|tools|skills|devices|photos|logs|llm/providers|llm/discover|llm/models|llm/gpus`, `POST /api/halo` (full operation passthrough), `POST /api/shutdown` (guarded disconnect), `POST /api/llm/chat` (backend proxy only).
Transports: stdio (`python -m bl_halo_mcp.run_server`), HTTP (`--serve`, mounts MCP at `/mcp` with lifespan wiring).
Resources: `skill://halo-dev/SKILL.md`. Prompts: `halo_recipe(goal)`.
