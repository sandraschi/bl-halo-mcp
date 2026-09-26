# Troubleshooting - bl-halo-mcp

- `ble_unavailable` -> `pip install brilliant-ble brilliant-msg brilliant-sdk` or stay MOCK.
- Pairing fails -> unpair in OS, hold 3 s, < 3 m distance, Noa app connect+pair.
- Display clipped -> HUD is small; keep `show_text` < 140 chars for glanceability (hard cap 500).
- Photo is 1x1 PNG -> you are in MOCK; pair hardware or use `halo-emulator`.
- Noa mock prefix -> expected until Noa app paired; see ONBOARDING.
- Port in use -> `.\start.ps1` clears 11976/11977; check `fleet-start.config.ps1`.
- CORS blocked -> only localhost 11976/11977 + tauri.localhost allowed by design.
