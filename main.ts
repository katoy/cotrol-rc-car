function readVals () {
    for (let index = 0; index <= 1; index++) {
        // P2:0 左ジョイスティック選択
        // P2:1 右ジョイスティック選択
        pins.digitalWritePin(DigitalPin.P2, index)
        vals[index] = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -255, 255)
    }
}
function saveVals () {
    for (let index2 = 0; index2 <= 1; index2++) {
        prevVals[index2] = vals[index2]
    }
}
function sendVals () {
    for (let index3 = 0; index3 <= 1; index3++) {
        radio.sendValue(keys[index3], Math.round(vals[index3]))
    }
}
function showVals () {
    for (let index4 = 0; index4 <= 1; index4++) {
        if (prevVals[index4] != vals[index4]) {
            col = cols[index4]
            led.unplot(col, Math.round(Math.map(prevVals[index4], -255, 255, 4, 0)))
            led.plot(col, Math.round(Math.map(vals[index4], -255, 255, 4, 0)))
        }
    }
}
function setup () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    radio.setGroup(12)
    vals = [0, 0]
    prevVals = [0, 0]
    cols = [0, 4]
    keys = ["L", "R"]
}
/**
 * ジョイスティック：
 * 
 * https://www.switch-science.com/catalog/5308/
 */
let cols: number[] = []
let col = 0
let keys: string[] = []
let prevVals: number[] = []
let vals: number[] = []
setup()
basic.forever(function () {
    saveVals()
    readVals()
    sendVals()
    showVals()
})
