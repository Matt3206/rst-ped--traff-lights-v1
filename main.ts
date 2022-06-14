radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        Green()
        basic.pause(10000)
        Yellow()
        basic.pause(5000)
        Red()
    } else {
        Red()
    }
})
function Traffic_Lights_Sensor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    distance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
}
input.onButtonPressed(Button.A, function () {
    Ped_countdown = 10
    if (Car_Check == 0) {
        basic.showIcon(IconNames.StickFigure)
        Green()
        basic.pause(10000)
        for (let index = 0; index <= 9; index++) {
            basic.showNumber(Ped_countdown - index)
        }
    }
    basic.pause(1000)
    basic.showIcon(IconNames.No)
    Yellow()
    basic.pause(5000)
    Red()
})
function Yellow () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Yellow))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
function TRAFFIC_LIGHT () {
    basic.showIcon(IconNames.No)
    Car_Check = 1
    basic.pause(5000)
    Green()
    basic.pause(10000)
    Yellow()
    basic.pause(5000)
    Car_Check = 0
    Red()
}
input.onButtonPressed(Button.B, function () {
    Ped_countdown = 10
    if (Car_Check == 0) {
        Green()
        basic.showIcon(IconNames.StickFigure)
        for (let index = 0; index < 3; index++) {
            music.playMelody("C5 B A - C5 B A - ", 120)
        }
        basic.pause(15000)
        for (let index = 0; index <= 9; index++) {
            basic.showNumber(Ped_countdown - index)
        }
        basic.pause(5000)
        basic.showIcon(IconNames.No)
        Yellow()
        basic.pause(5000)
        Red()
    }
})
function Green () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Green))
}
function Red () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Red))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.showIcon(IconNames.No)
}
let range: neopixel.Strip = null
let Ped_countdown = 0
let distance = 0
let strip: neopixel.Strip = null
let Car_Check = 0
radio.setGroup(103)
Car_Check = 0
let Light_Check = 0
strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
strip.setBrightness(255)
Red()
basic.forever(function () {
    for (let index = 0; index < 10; index++) {
        Traffic_Lights_Sensor()
        if (distance <= 5) {
            Light_Check += 1
        }
    }
    if (Light_Check == 9 || Light_Check == 10) {
        TRAFFIC_LIGHT()
        Light_Check = 0
    }
    Light_Check = 0
})
