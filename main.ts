/**
 * ジョイスティック：
 * 
 * https://www.switch-science.com/catalog/5308/
 */
let R = 0
let L = 0
let DISP_R = 0
let DISP_L = 0
radio.setGroup(12)
basic.forever(function () {
    led.unplot(0, DISP_L)
    led.unplot(4, DISP_R)
    // P2:0 左ジョイスティック選択
    // P2:1 右ジョイスティック選択
    pins.digitalWritePin(DigitalPin.P2, 0)
    // P0は横方向
    // P1は縦方向
    L = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
    pins.digitalWritePin(DigitalPin.P2, 1)
    R = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
    DISP_R = Math.round(Math.map(R, -100, 100, 4, 0))
    DISP_L = Math.round(Math.map(L, -100, 100, 4, 0))
    led.plot(0, DISP_L)
    led.plot(4, DISP_R)
})
