# bl-halo-mcp user guide (in-bundle)

Cookbook for agents and humans operating Halo/Frame through this bridge.

## Recipe 01

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 02

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 03

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 04

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 05

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 06

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 07

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 08

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 09

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 10

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 11

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 12

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 13

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 14

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 15

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 16

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 17

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 18

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 19

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 20

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 21

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 22

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 23

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 24

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 25

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 26

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 27

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 28

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 29

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 30

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 31

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 32

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 33

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 34

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 35

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

## Recipe 36

Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Steps: 1) halo_device status. 2) list_devices. 3) connect. 4) show_text hello. 5) capture_photo then list_photos. 6) imu_read and tap_history. 7) run_lua frame.display hello. 8) deploy_lua main.lua. 9) noa_ask question. 10) miniapp_create prompt. 11) firmware_info. 12) halo_dashboard Prefab. 13) halo_shutdown confirm true when done.

- Example status: call halo_device with operation status; Read connection + battery + display state. Start every session here.
- Example list_devices: call halo_device with operation list_devices; List Halo/Frame BLE profiles (MOCK + live).
- Example connect: call halo_device with operation connect; BLE connect (MOCK short-circuit when BL_HALO_MOCK=true).
- Example disconnect: call halo_device with operation disconnect; BLE disconnect.
- Example show_text: call halo_device with operation show_text; Render <=500 chars to HUD (Halo 640x480, Frame 640x400).
- Example show_image: call halo_device with operation show_image; Queue base64 image (<=2 MB) to HUD.
- Example clear_display: call halo_device with operation clear_display; Clear HUD text/image.
- Example capture_photo: call halo_device with operation capture_photo; Capture photo (MOCK 1x1 PNG fixture).
- Example list_photos: call halo_device with operation list_photos; Paginated photo list (limit/offset/has_more).
- Example imu_read: call halo_device with operation imu_read; Accelerometer + magnetometer snapshot.
- Example tap_history: call halo_device with operation tap_history; Tap/click events (Halo: single/double/long).
- Example play_audio: call halo_device with operation play_audio; Bone-conduction playback 1-30 s.
- Example record_audio: call halo_device with operation record_audio; Dual-mic record 1-30 s.
- Example run_lua: call halo_device with operation run_lua; Execute Lua 5.4 frame.* source (<=20k chars).
- Example list_lua_apps: call halo_device with operation list_lua_apps; Paginated Lua app list.
- Example deploy_lua: call halo_device with operation deploy_lua; Save plain *.lua to device dir.
- Example noa_ask: call halo_device with operation noa_ask; Ask Noa (MOCK prefix until paired).
- Example miniapp_create: call halo_device with operation miniapp_create; Natural language -> *.lua Miniapp draft.
- Example firmware_info: call halo_device with operation firmware_info; Model, firmware, Lua 5.4, BLE services, displays.

Notes 1: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 2: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 3: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 4: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 5: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 6: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 7: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 8: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 9: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 10: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 11: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 12: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 13: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 14: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 15: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 16: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 17: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 18: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 19: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 20: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 21: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 22: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 23: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 24: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 25: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 26: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 27: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 28: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 29: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 

Notes 30: Halo is a Bluetooth LE peripheral, not a standalone computer. The host app drives logic while the glass runs a Lua 5.4 event loop over the frame.* API. Halo HUD is a 0.2 inch 640x480 RGB microOLED peripheral above the left lens; Frame is 640x400 color OLED at 20 degrees FOV. Both weigh about 40 grams, both expose camera, IMU, microphone, speaker, buttons, taps, file system, Bluetooth, compression, and display libraries. Halo adds dual microphones with audio-activity detection, two bone-conduction speakers, click single double long events, an NPU for on-device inference, and longer battery. The Brilliant SDK splits into brilliant-ble transport with MTU-aware packet splitting and brilliant-msg rich types for sprites text photos audio IMU taps clicks. Every message type pairs with on-device Lua. Development without hardware uses halo-emulator with firmware-faithful fonts palette and event injection plus automated tests. 
