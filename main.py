def Traffic_Light():
    pass
def Traffic_Lights_Sensor():
    global distance
    pins.digital_write_pin(DigitalPin.P1, 0)
    control.wait_micros(2)
    pins.digital_write_pin(DigitalPin.P1, 1)
    control.wait_micros(10)
    pins.digital_write_pin(DigitalPin.P1, 0)
    distance = pins.pulse_in(DigitalPin.P0, PulseValue.HIGH) + 58
    basic.pause(2000)
    basic.show_number(distance)

def on_button_pressed_a():
    global Ped
    Ped += 1
    Ped_Fun()
input.on_button_pressed(Button.A, on_button_pressed_a)

def Yellow():
    global range2
    range2 = strip.range(0, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(1, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.YELLOW))
    range2 = strip.range(2, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
def Ped_Fun():
    global Ped_countdown, Ped
    Ped_countdown = 5
    if Ped == 0:
        Red()
        basic.show_icon(IconNames.NO)
    elif Ped == 1:
        Green()
        basic.show_icon(IconNames.STICK_FIGURE)
        music.play_melody("C - - - C - - - ", 120)
        basic.pause(10000)
        Yellow()
        for index in range(5):
            basic.show_number(Ped_countdown - index)
        Ped = 0
        basic.show_icon(IconNames.NO)
        Red()
    else:
        Ped_countdown += 5
        Green()
        basic.show_icon(IconNames.STICK_FIGURE)
        for index2 in range(3):
            music.play_melody("C5 B A - C5 B A - ", 120)
        Yellow()
        basic.pause(15000)
        Ped = 0
        for index3 in range(10):
            basic.show_number(Ped_countdown - index3)
        Red()
        basic.show_icon(IconNames.NO)

def on_button_pressed_b():
    global Ped
    Ped += 2
    Ped_Fun()
input.on_button_pressed(Button.B, on_button_pressed_b)

def Green():
    global range2
    range2 = strip.range(0, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(1, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(2, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.GREEN))
def Red():
    global range2
    range2 = strip.range(0, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.RED))
    range2 = strip.range(1, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
    range2 = strip.range(2, 1)
    range2.show_color(neopixel.colors(NeoPixelColors.BLACK))
Ped_countdown = 0
range2: neopixel.Strip = None
distance = 0
strip: neopixel.Strip = None
Ped = 0
Ped = 0
strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
strip.set_brightness(255)
Ped_Fun()

def on_forever():
    Ped_Fun()
basic.forever(on_forever)
