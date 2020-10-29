const Gpio = require('pigpio').Gpio;
const red = new Gpio(26, { mode: Gpio.OUTPUT });
const green = new Gpio(19, { mode: Gpio.OUTPUT });
const blue = new Gpio(13, { mode: Gpio.OUTPUT });

const interval = setInterval(() => {
  red.pwmWrite(randomByte());
  green.pwmWrite(randomByte());
  blue.pwmWrite(randomByte());
}, 500);

function randomByte() {
  return 255 - Math.floor(Math.random() * 100);
}

