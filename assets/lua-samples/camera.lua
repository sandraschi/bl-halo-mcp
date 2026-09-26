-- camera.lua - capture a photo and stream it back over BLE
-- (host side: brilliant-ble receives the chunks; see brilliant_sdk examples)
local mtu = frame.bluetooth.max_length()
frame.camera.capture({ quality = "HIGH" })
while not frame.camera.image_ready() do
    frame.sleep(0.05)
end
while true do
    local data = frame.camera.read(mtu)
    if data == nil then break end
    frame.bluetooth.send(data)
end
frame.display.clear()
frame.display.text("Photo sent", 50, 50)
