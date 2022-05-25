radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 103) {
        Green()
        basic.pause(20000)
        Yellow()
        basic.pause(10000)
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
    distance = pins.pulseIn(DigitalPin.P0, PulseValue.High) + 58
    if (distance >= 5) {
        Green()
        basic.pause(10000)
        Yellow()
        basic.pause(5000)
    } else if (distance < 5) {
        Red()
        basic.pause(1000)
    }
}
input.onButtonPressed(Button.A, function () {
    Ped += 1
    Ped_Fun()
})
function Yellow () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Yellow))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
function Ped_Fun () {
    Ped_countdown = 5
    if (Ped == 0) {
        Red()
        basic.showIcon(IconNames.No)
    } else if (Ped == 1) {
        Green()
        basic.showIcon(IconNames.StickFigure)
        music.playMelody("C - - - C - - - ", 120)
        basic.pause(10000)
        for (let index = 0; index <= 4; index++) {
            Yellow()
            basic.showNumber(Ped_countdown - index)
        }
        Ped = 0
        basic.showIcon(IconNames.No)
        Red()
    } else {
        Ped_countdown += 5
        Green()
        basic.showIcon(IconNames.StickFigure)
        for (let index = 0; index < 3; index++) {
            music.playMelody("C5 B A - C5 B A - ", 120)
        }
        basic.pause(15000)
        Ped = 0
        for (let index = 0; index <= 9; index++) {
            Yellow()
            basic.showNumber(Ped_countdown - index)
        }
        Red()
        basic.showIcon(IconNames.No)
    }
}
input.onButtonPressed(Button.B, function () {
    Ped += 2
    Ped_Fun()
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
}
let Ped_countdown = 0
let range: neopixel.Strip = null
let distance = 0
let strip: neopixel.Strip = null
let Ped = 0
Ped = 0
strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
strip.setBrightness(255)
radio.setGroup(103)
Ped_Fun()
basic.forever(function () {
    Traffic_Lights_Sensor()
    Ped_Fun()
})
