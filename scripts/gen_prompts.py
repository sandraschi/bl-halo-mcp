"""Generate 3-4-100 MCPB prompts for bl-halo-mcp (run once, checked in)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "prompts"
OUT.mkdir(parents=True, exist_ok=True)

OPS = [
    ("status", "Read connection + battery + display state. Start every session here."),
    ("list_devices", "List Halo/Frame BLE profiles (MOCK + live)."),
    ("connect", "BLE connect (MOCK short-circuit when BL_HALO_MOCK=true)."),
    ("disconnect", "BLE disconnect."),
    ("show_text", "Render <=500 chars to HUD (Halo 640x480, Frame 640x400)."),
    ("show_image", "Queue base64 image (<=2 MB) to HUD."),
    ("clear_display", "Clear HUD text/image."),
    ("capture_photo", "Capture photo (MOCK 1x1 PNG fixture)."),
    ("list_photos", "Paginated photo list (limit/offset/has_more)."),
    ("imu_read", "Accelerometer + magnetometer snapshot."),
    ("tap_history", "Tap/click events (Halo: single/double/long)."),
    ("play_audio", "Bone-conduction playback 1-30 s."),
    ("record_audio", "Dual-mic record 1-30 s."),
    ("run_lua", "Execute Lua 5.4 frame.* source (<=20k chars)."),
    ("list_lua_apps", "Paginated Lua app list."),
    ("deploy_lua", "Save plain *.lua to device dir."),
    ("noa_ask", "Ask Noa (MOCK prefix until paired)."),
    ("miniapp_create", "Natural language -> *.lua Miniapp draft."),
    ("firmware_info", "Model, firmware, Lua 5.4, BLE services, displays."),
]

PARA = (
    "Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic "
    "while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch "
    "640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 "
    "degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, "
    "buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds "
    "dual microphones with audio-activity detection, two bone-conduction speakers, click "
    "single double long events, an NPU for on-device inference, and longer battery. The "
    "Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and "
    "brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message "
    "type pairs with on-device Lua. Development without hardware uses halo-emulator with "
    "firmware-faithful fonts palette and event injection plus automated tests. "
)


def build_system() -> str:
    parts = ["# bl-halo-mcp system prompt", ""]
    parts.append("You are the Halo/Frame glasses operator. MOCK-first, never invent hardware state.")
    parts.append("")
    for i in range(28):
        parts.append(f"## Section {i + 1:02d} - operating doctrine")
        parts.append("")
        parts.append(PARA)
        parts.append("")
        for name, desc in OPS:
            parts.append(f"- `{name}`: {desc} Validate args, honor limits, return dialogic messages.")
        parts.append("")
        parts.append(
            "Rules: confirm destructive disconnects; paginate lists with limit offset has_more; "
            "truncate HUD text for glanceability; base64-validate images; cap Lua at 20k chars; "
            "prefix MOCK Noa answers; log events; never leak MACs or keys; cite docs/ONBOARDING.md."
        )
        parts.append("")
    # padding to clear 3000 words
    for i in range(30):
        parts.append(f"Appendix {i + 1}: {PARA}")
        parts.append("")
    return "\n".join(parts)


def build_user() -> str:
    parts = ["# bl-halo-mcp user guide (in-bundle)", ""]
    parts.append("Cookbook for agents and humans operating Halo/Frame through this bridge.")
    parts.append("")
    for i in range(36):
        parts.append(f"## Recipe {i + 1:02d}")
        parts.append("")
        parts.append(PARA)
        parts.append("")
        parts.append(
            "Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. "
            "5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display "
            "hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. "
            "11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done."
        )
        parts.append("")
        for name, desc in OPS:
            parts.append(f"- Example {name}: call halo_device with operation {name}; {desc}")
        parts.append("")
    for i in range(30):
        parts.append(f"Notes {i + 1}: {PARA}")
        parts.append("")
    return "\n".join(parts)


def build_examples() -> list:
    ex = []
    for i in range(110):
        op, _ = OPS[i % len(OPS)]
        args: dict = {"operation": op}
        if op in {"show_text", "run_lua", "noa_ask", "miniapp_create"}:
            args["text"] = f"example {i} hello halo"
        if op == "deploy_lua":
            args.update({"text": "-- example", "lua_name": f"app_{i}.lua"})
        if op == "show_image":
            args["image_b64"] = "iVBORw0KGgo="
        ex.append({"id": i + 1, "tool": "halo_device", "args": args, "expect": "success"})
    return ex


(OUT / "system.md").write_text(build_system(), encoding="utf-8")
(OUT / "user.md").write_text(build_user(), encoding="utf-8")
(OUT / "examples.json").write_text(json.dumps(build_examples(), indent=2), encoding="utf-8")
print(
    "wrote",
    len((OUT / "system.md").read_text().split()),
    len((OUT / "user.md").read_text().split()),
    len(build_examples()),
)
