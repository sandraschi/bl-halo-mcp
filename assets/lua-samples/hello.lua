-- hello.lua - draw text and a shape (Halo draws immediately, no show() needed)
frame.display.clear()
frame.display.text("Hello Halo", 50, 50)
frame.display.circle(128, 128, 50, 0x0055FF, true)
