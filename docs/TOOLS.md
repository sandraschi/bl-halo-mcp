# Tools - bl-halo-mcp

All implemented, no stubs. MOCK-safe.

| Tool | Ops |
|------|-----|
| `halo_device` (portmanteau) | status, list_devices, connect, disconnect, show_text, show_image, clear_display, capture_photo, list_photos (limit/offset/has_more), imu_read, tap_history, play_audio, record_audio, run_lua, list_lua_apps, deploy_lua, noa_ask, miniapp_create, firmware_info |
| `halo_dashboard` (app=True Prefab) | Status card: device, battery, display, counts |
| `halo_help` | topic: pairing, lua, display, noa, ble |
| `halo_shutdown` | Guarded disconnect (confirm=True) |

REST: `GET /api/health|dashboard|tools|skills|devices|logs|llm/providers|llm/models|llm/gpus`, `POST /api/llm/chat`.
Resources: `skill://halo-dev/SKILL.md`. Prompts: `halo_recipe(goal)`.
