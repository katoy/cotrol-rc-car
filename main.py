def readVals():
    for index in range(2):
        # P2:0 左ジョイスティック選択
        # P2:1 右ジョイスティック選択
        pins.digital_write_pin(DigitalPin.P2, index)
        vals[index] = Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, -255, 255)
def saveVals():
    for index2 in range(2):
        prevVals[index2] = vals[index2]
def sendVals():
    for index3 in range(2):
        radio.send_value(keys[index3], Math.round(vals[index3]))
def showVals():
    global col
    for index4 in range(2):
        if prevVals[index4] != vals[index4]:
            col = cols[index4]
            led.unplot(col, Math.round(Math.map(prevVals[index4], -255, 255, 4, 0)))
            led.plot(col, Math.round(Math.map(vals[index4], -255, 255, 4, 0)))
"""

ジョイスティック：

https://www.switch-science.com/catalog/5308/

"""
col = 0
keys: List[str] = []
cols: List[number] = []
prevVals: List[number] = []
vals: List[number] = []
basic.show_leds("""
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    """)
radio.set_group(12)
vals = [0, 0]
prevVals = [0, 0]
cols = [0, 4]
keys = ["L", "R"]

def on_forever():
    saveVals()
    readVals()
    sendVals()
    showVals()
basic.forever(on_forever)
