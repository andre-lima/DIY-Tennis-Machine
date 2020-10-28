const Gpio = require('pigpio').Gpio;
const led = new Gpio(18, { mode: Gpio.OUTPUT });

let dutyCycle = 0;
let direction = 1;

setInterval(() => {
  led.pwmWrite(dutyCycle);

  dutyCycle += 10 * direction;
  if (dutyCycle > 255) {
    direction = -1;
    dutyCycle = 255
  } else if (dutyCycle < 0) {
    direction = 1;
    dutyCycle = 0
  }
}, 20);
