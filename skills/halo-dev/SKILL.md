# halo-dev

Use `halo_device` for everything Halo/Frame. Start with `status`, then `connect`.
`halo_help()` (no args) prints the capability matrix - what works with nothing,
with glasses, or with a Noa key. Read it before assuming anything is broken.

- No cloud, no key, no glasses: MOCK rehearsal. Display writes logged, photos are
  1x1 PNG fixtures, Noa answers are labeled placeholders. Nothing is fake-live.
- Glasses in BLE range (`BL_HALO_MOCK=false` + MAC + `connect`): everything local
  is REAL - display, camera, IMU/taps, audio, Lua. No account or key involved.
- Display: Halo panel 640x480 but **drawable 256x256**, draws apply immediately
  (no `show()` needed; Frame needs it). Keep text <140 chars. `show_text`
  (<=500), `show_image` (base64 <=2 MB), `clear_display`.
- Camera: `capture_photo`, `list_photos`. MOCK returns a 1x1 PNG fixture.
- IMU/taps: `imu_read`, `tap_history` (BMA580 engine: single/double/triple).
- Audio: `play_audio` / `record_audio` (1-30 s, bone-conduction + dual mics).
- Lua 5.4 `frame.*` on Zephyr: `run_lua` (<=20k chars), `deploy_lua` (plain
  `*.lua`), `list_lua_apps`. No hardware? `pip install halo-emulator`.
- Noa: `noa_ask` WITHOUT `NOA_API_KEY` returns a labeled MOCK placeholder BY DESIGN.
  Live = `POST api.brilliant.xyz/dev/noa` with `Authorization: <preview-key>`
  (contract copied from Brilliant's public noa-playground repo; unofficial, may
  move). Get a key from the playground's API key box, set `NOA_API_KEY`, restart.
  Bad key returns `error_type: noa_cloud`, never silent mock.
- `miniapp_create` drafts `*.lua` from natural language only (store lives in Noa app).
- BLE services: Halo Lua, Battery, OTA, LE Audio. Python: `brilliant-ble`, `brilliant-msg`.
- Hardware facts: `halo_help("hardware")` or docs/HARDWARE.md (Balletto B1,
  PAG7982J1 camera, 300 mAh, official STL link). No official CAD sources exist.
- Safety: `halo_shutdown(confirm=True)` disconnects. Never invent a MAC; MOCK uses `MOCK:00:...`.
