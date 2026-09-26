# Onboarding - bl-halo-mcp

## What this is for

Bridge between fleet agents and Brilliant Labs **Halo** AI glasses (2025, successor to **Frame** 2024). Send HUD text/images, capture photos, read IMU/taps, stream audio, run on-device Lua 5.4 `frame.*` apps, and draft Noa Miniapps from natural language. It does **not** replace the Noa mobile app, flash firmware, or bypass Bluetooth pairing.

## Cost and accounts (money / CC)

| Question | Answer |
|----------|--------|
| Do I need an account? | No for MOCK/emulator. Yes (App Store / Play Noa app) for live Noa answers + Miniapp store. |
| Free tier? | Yes - Halo ships with Noa free incl. daily usage caps; emulator + SDKs free/open-source (BSD-3). |
| Credit card required? | No for device + emulator. Only if you exceed Noa caps / paid phone store extras. |
| Ongoing cost? | Halo $299-399 one-time + prescription via SmartBuyGlasses (optional). Noa cloud free within daily caps. No fleet charge. |
| Noa key? | No signup portal exists. Paths: (a) Noa mobile app account (free), (b) preview key from the public `noa-playground` repo's API key box -> `NOA_API_KEY` in `.env`. Without either, `noa_ask` answers MOCK by design. |
| Who bills? | Brilliant Labs (hardware) / Apple-Google stores (Noa app). Not sandraschi. |

## Prerequisites outside this repo

- Halo ($299-399, first units shipped Aug 2026 in limited quantities after repeated
  production slips; Frame is discontinued/sold out - check brilliant.xyz storefront
  for current stock) **or** Frame ($349, used) **or** nothing (MOCK + `halo-emulator`).
- Windows 10/11 + Bluetooth LE (live), or any PC for MOCK.
- Python 3.11+ via uv; optional: Noa app on iOS/Android for live AI answers.
- Upstream: `https://docs.brilliant.xyz`, SDK `https://github.com/brilliantlabsAR/brilliant_sdk`, Noa `https://github.com/brilliantlabsAR/noa-flutter`.

## First-timer setup steps

1. `Copy-Item .env.example .env` - leave `BL_HALO_MOCK=true` for first run.
2. `uv sync --extra dev` then `uv run pytest -q` (green = bridge healthy).
3. `.\start.ps1` - backend `http://127.0.0.1:11976/api/health`, frontend `http://127.0.0.1:11977`.
4. Dashboard shows MOCK device (Joe Mocky banner) - try Tools: `status`, `show_text`, `capture_photo`.
5. Live hardware (optional): charge Halo, hold pairing 3 s with cradle, Noa app connect+pair, set `BL_HALO_MOCK=false` + `BL_HALO_DEVICE_MAC=<mac>`, restart, `connect`.
6. No hardware but real Lua: `pip install halo-emulator` then `halo-emulator ./my_app/` - same Lua as device.

## Pitfalls

- Halo is a BLE **peripheral** - no app launcher on-glass; host app drives logic, glass runs event loop. Do not expect installs on-glass.
- Frame `frame.*` Lua mostly ports to Halo, but Halo adds click/audio-activity + 640x480 HUD (Frame 640x400) - check `MIGRATION.md` in `brilliant_sdk`.
- Custom firmware needs destructive disassembly to debug port - do not attempt; use Lua + host SDK.
- BLE range/pairing flakiness: unpair in OS settings, re-hold 3 s, keep phone/PC < 3 m.
- Camera is low-power inference sensor, not a GoPro - MOCK returns 1x1 PNG fixture.
- Never commit a real MAC or Noa token - `.env` is gitignored.

## Sanity check

- `GET /api/health` returns `{"ok": true, "mock": true, ...}` in MOCK, `instance_configured: true`.
- Settings page green badge when connected; red `onboarding-cue` CTA while MOCK.
- MCP: `halo_device(status)` -> `success: true`; `show_text` renders; `capture_photo` lists in Gallery.
- Emulator: `halo-emulator` window shows Lua text.

## Declared doubles

- Without hardware everything is an explicit MOCK: display writes logged, photos are 1x1 PNG fixtures, Noa answers prefixed `[MOCK Noa]`, IMU returns rest pose. UI carries MOCK badges until `connect` succeeds with `BL_HALO_MOCK=false`. No silent fake-live data.
