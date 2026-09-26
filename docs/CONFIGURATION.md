# Configuration - bl-halo-mcp

| Var | Default | Purpose |
|-----|---------|---------|
| `BL_HALO_BACKEND_PORT` / `WEB_PORT` | 11976 | Starlette backend + MCP HTTP mount |
| `BL_HALO_FRONTEND_PORT` / `VITE_PORT` | 11977 | Vite dashboard |
| `VITE_API_TARGET` | http://127.0.0.1:11976 | Frontend proxy target |
| `BL_HALO_MOCK` | true | true = emulator/MOCK, no BLE needed |
| `BL_HALO_DEVICE_MAC` | (blank) | Live BLE MAC after pairing |
| `BL_HALO_DEVICE_NAME` | Halo | Friendly name |
| `BL_HALO_API_URL` | http://127.0.0.1:11976 | Probe URL for stdio proxy |
| `BL_HALO_DATA_DIR` | data | State JSON + photos + lua_apps (gitignored) |
| `NOA_API_KEY` / `BRILLIANT_API_KEY` | (blank) | Optional future Noa cloud helpers |

Ports registered in `mcp-central-docs/operations/WEBAPP_PORTS.md` (11976/11977).
CORS allowlist: 127.0.0.1/localhost 11976-11977 + tauri.localhost only.
