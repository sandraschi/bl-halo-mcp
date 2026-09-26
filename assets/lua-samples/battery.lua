-- battery.lua - show battery level and play a preset sound
local level = frame.battery_level()
frame.display.clear()
frame.display.text("Battery: " .. level .. "%", 50, 50)
frame.sound.play("blip")
