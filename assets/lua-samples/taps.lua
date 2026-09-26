-- taps.lua - react to taps (single/double/triple from the BMA580 engine)
frame.imu.tap_callback(function(kind)
    frame.display.clear()
    if kind == "double" then
        frame.display.text("Double tap!", 50, 50)
    else
        frame.display.text("Tap: " .. kind, 50, 50)
    end
end)
