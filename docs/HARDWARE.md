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

## Why open is the selling argument (Sep 2026 field)

Closed field, open niche of one. Meta holds ~76% of AI-glasses share (Q2 2026)
with Ray-Ban Meta Gen 2 / Oakley / Display; the rest is Rokid, Even G2, XREAL,
Xiaomi, Huawei, Solos, Halliday, VITURE, Snap - every one of them closed
hardware, closed OS, closed assistant. No commercial rival publishes hardware
docs, STLs, SDK, emulator, on-device language VM, and open companion app the
way Brilliant does (25 public repos).

Closest open efforts, honestly graded:

- **MentraOS** (Mentra, on GitHub since Apr 2026, permissive license): open
  smart-glasses OS + TypeScript SDK + miniapp store - write once, run on Mentra
  Live/Mach 1, Even G1/G2 (full G2 support May 2026), Vuzix Z100. Phone acts as
  the app runtime (one sensor-to-cloud pipeline, concurrent apps); live captions,
  translation, notetaker ship working. Real and VC-backed, but it runs on *other
  people's closed hardware* - complementary to Halo, not a substitute, and no
  Halo port exists.
- **Mentra Community OpenSourceSmartGlasses** (GitHub): open display/mic glasses
  design with translation/assistant apps. Genuine open hardware, earlier stage
  than Halo, smaller ecosystem.
- **OpenGlass** DIY: turn any glasses into an AI gadget for pocket money.
  Toy/hobby tier - great demo, not a product.

So: if you want hackable glasses you can actually buy, audit, print parts for,
and program on-device, Halo is the only commercial option as of Sep 2026. That
is this repo's entire reason to exist - every closed rival would need
screen-scraping hacks where Halo gives you BLE + Lua + emulator.

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

## Recording indicator: none documented (read this)

No Brilliant manual, review, or press piece documents a capture/recording LED
on Halo. The camera (`frame.camera.capture`) is available to any on-device Lua
on demand, with no OS-level indicator described anywhere public. Contrast Meta
Ray-Ban (white capture LED; Aug-Sep 2026: Meta now bricks the camera if the LED
is covered/tampered, under EU pressure). Practical consequences:

- Do not claim Halo signals recording - it is undocumented either way.
- Verify on hardware before any public demo: look for a front light during
  `capture_photo` and note it here.
- Street use: Halo's Narrative feature remembers faces/names by design, so the
  social question ("is it recording me?") has no hardware answer today.

On PRC perception specifically: no survey data found - do not invent any. What
is sourced: the LED wars are a US/EU story (Meta, EU data-protection
authorities); China's formal angle runs through PIPL (facial data = sensitive
personal information, consent required) while street-level camera tolerance is
very high (densest public surveillance + ubiquitous phone filming). Whether a
tiny LED moves PRC user acceptance is unknown - that is an open research
question, not a fact.

## Safety (from Brilliant, abridged)

Do not use while driving/operating machinery; eye strain/headache/motion sickness
possible; flashing images unsuitable for photosensitive users. Consumer/R&D grade,
not for critical/health/safety use. Li-ion: no heat/fire/liquid exposure, do not
remove cells, e-waste disposal.
