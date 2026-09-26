# Hardware - bl-halo-mcp (grounded in docs.brilliant.xyz/halo/hardware, 2026-09-26)

## What Brilliant actually publishes

- **Official STL**: `https://docs.brilliant.xyz/halo/halo.stl` - full Halo assembly
  (front, both lenses, both temple arms, open position). Open it in the dashboard
  **Hardware** page (Three.js viewer: URL load + local file picker).
- **No official CAD sources** (STEP/SLDPRT) and **no firmware repo** (docs say
  "Halo codebase repository (coming soon)"). Do not claim otherwise.
- Manual: `https://docs.brilliant.xyz/halo/hardware`. Frame manual:
  `https://docs.brilliant.xyz/frame/hardware`.

## Halo at a glance (corrected spec)

| Part | Chip / spec |
|------|-------------|
| MCU+NPU | Balletto B1 (Alif): Cortex-M55 + Ethos-U55, 1.8 MB MRAM, 2 MB SRAM |
| OS | Zephyr OS + Lua 5.4 VM, OTA via MCUboot over BLE |
| Radio | Bluetooth LE 5.3 (peripheral: Halo Lua, Battery, OTA, LE Audio) |
| Display | 0.2 in 640x480 RGB microOLED panel, **256x256 drawable**, draws apply immediately (no `show()`; Frame needs it) |
| Camera | PAG7982J1 VGA global shutter, 81.2 deg HFOV, libmpix pipeline |
| Mics | Dual TDK T5838, always-on audio-activity (AAD) wake mode |
| Speakers | Bone conduction via TI TPA2011D1, PCM/LC3 over dedicated AUDIO TX (bypasses Lua) |
| IMU | BMA580 accel (single/double/triple tap interrupts) + QMC6308 compass |
| Power | 2x150 mAh (300 mAh), BQ25170 charger, magnetic USB-C |
| Weight | ~40 g |

## What this means for the bridge

- Display code must fit **256x256**, not 640x480 (`show_text` clips at 500 chars,
  aim <140 for glanceability).
- `frame.display.show()` is a harmless no-op on Halo; keep it for Frame compat.
- Audio streaming path bypasses Lua - `play_audio` latency is a host concern.
- Tap interrupts come from the BMA580 - `tap_history` kinds map to its engine.

## Provenance & availability (Sep 2026)

- Status: alive, small-batch. First units Aug 2026, limited quantities, direct
  sale via brilliant.xyz ($299 pre-launch, now $349-399). Frame discontinued.
- Company: founded Hong Kong 2019 (ex-Apple Bobak Tavangar), HQ Singapore.
  2026 partnerships: Alif (Balletto), Neuphonic + TheStage AI (on-device
  inference), Liquid AI (Noa vision-language).
- Manufacturing: China-centered supply chain (assembly factory not named;
  schedules move with Chinese holidays; their own blog describes painful 2025
  team+supply-chain restructuring after Frame lessons). Far-East BOM: Guozhao
  OLEDoS, QST compass, Grepow cells; plus PixArt (TW) camera, Bosch (DE) accel,
  TDK (JP) mics, TI (US) charger/amp, Alif Balletto MCU.
- What it means here: MOCK-first + emulator is the primary dev path; hardware
  is a bonus. Check the storefront for current stock, not this file.

## Safety (from Brilliant, abridged)

Do not use while driving/operating machinery; eye strain/headache/motion sickness
possible; flashing images unsuitable for photosensitive users. Consumer/R&D grade,
not for critical/health/safety use. Li-ion: no heat/fire/liquid exposure, do not
remove cells, e-waste disposal.
