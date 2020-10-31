"""

ジョイスティック：

https://www.switch-science.com/catalog/5308/

"""
R = 0
L = 0
DISP_R = 0
DISP_L = 0
radio.set_group(12)

def on_forever():
    global L, R, DISP_R, DISP_L
    led.unplot(0, DISP_L)
    led.unplot(4, DISP_R)
    # P2:0 左ジョイスティック選択
    # P2:1 右ジョイスティック選択
    pins.digital_write_pin(DigitalPin.P2, 0)
    # P0は横方向
    # P1は縦方向
    L = Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, -100, 100)
    pins.digital_write_pin(DigitalPin.P2, 1)
    R = Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, -100, 100)
    DISP_R = Math.round(Math.map(R, -100, 100, 4, 0))
    DISP_L = Math.round(Math.map(L, -100, 100, 4, 0))
    led.plot(0, DISP_L)
    led.plot(4, DISP_R)
basic.forever(on_forever)
