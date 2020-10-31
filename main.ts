/**
 * ジョイスティック：
 * 
 * https://www.switch-science.com/catalog/5308/
 */
let PREV_R = 0
let PREV_L = 0
let DISP_R = 0
let DISP_L = 0
let R = 0
let L = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
radio.setGroup(12)
basic.forever(function () {
    // P2:0 左ジョイスティック選択
    // P2:1 右ジョイスティック選択
    pins.digitalWritePin(DigitalPin.P2, 0)
    // P0は横方向
    // P1は縦方向
    L = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
    pins.digitalWritePin(DigitalPin.P2, 1)
    R = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -100, 100)
    radio.sendValue("L", L)
    radio.sendValue("R", R)
    DISP_L = Math.round(Math.map(L, -100, 100, 4, 0))
    DISP_R = Math.round(Math.map(R, -100, 100, 4, 0))
    if (DISP_L != PREV_L) {
        led.unplot(0, PREV_L)
        led.plot(0, DISP_L)
    }
    if (DISP_R != PREV_R) {
        led.unplot(4, PREV_R)
        led.plot(4, DISP_R)
    }
    PREV_L = DISP_L
    PREV_R = DISP_R
})
