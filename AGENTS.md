# bl-halo-mcp - AGENTS.md

Identity: Fleet wrapper for Brilliant Labs Halo/Frame glasses over BLE + Lua VM.

- Ports: backend 11976 (`bl_halo_mcp.api:app`), frontend 11977 (`web_sota`). No second daemon when NSSM up.
- Env: `BL_HALO_MOCK` (default true), `BL_HALO_DEVICE_MAC`, `BL_HALO_API_URL`. No hardcoded ports.
- State: `data/halo_state.json` (+ photos, lua_apps). Stateless server; JSON file is the store.
- Tools: `halo_device` portmanteau (19 ops), `halo_dashboard` app=True, `halo_help`, `halo_shutdown`.
- Webapp: catch-them-all pages, red `onboarding-cue` + MOCK badges until `connect` live.
- Gates: `just ci` (ruff + pytest), `tsc --noEmit` + `biome check` in web_sota.
