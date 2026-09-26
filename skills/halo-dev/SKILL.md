# halo-dev

Use `halo_device` for everything Halo/Frame. Start with `status`, then `connect`.

- Display: `show_text` (<=500 chars), `show_image` (base64, <=2 MB), `clear_display`.
  Halo HUD 640x480 peripheral; Frame 640x400. Small text reads best.
- Camera: `capture_photo`, `list_photos`. MOCK returns a 1x1 PNG fixture.
- IMU/taps: `imu_read`, `tap_history`. Halo adds click single/double/long + audio-activity.
- Audio: `play_audio` / `record_audio` (1-30 s, bone-conduction + dual mics).
- Lua 5.4 `frame.*`: `run_lua` (<=20k chars), `deploy_lua` (plain `*.lua`), `list_lua_apps`.
  Emulator: `pip install halo-emulator && halo-emulator ./my_app/`.
- Noa: `noa_ask` (MOCK until Noa app paired), `miniapp_create` (natural language -> `*.lua` draft).
- BLE services: Halo Lua, Battery, OTA, LE Audio. Python: `brilliant-ble`, `brilliant-msg`.
- Safety: `halo_shutdown(confirm=True)` disconnects. Never invent a MAC; MOCK uses `MOCK:00:...`.
