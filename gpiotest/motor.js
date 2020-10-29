const i2c = require('i2c-bus');
const Gpio = require('pigpio').Gpio;

const motorP1 = new Gpio(27, { mode: Gpio.OUTPUT });
const motorP2 = new Gpio(17, { mode: Gpio.OUTPUT });
const enablePin = new Gpio(22, { mode: Gpio.OUTPUT });

const ADDR = 0x4b;
const POT_REG = 0x05;
const resolution = 16;

const i2c1 = i2c.openSync(1);

const interval = setInterval(() => {
  const rawData = i2c1.readWordSync(ADDR, POT_REG);
  let normalizedData = Math.floor(rawData * 255 / ((2 ** resolution) - 1));
  let range = normalizedData - 128;
  let speed = Math.abs(range * 2) - 1;
  enablePin.pwmWrite(speed);

  if (range > 0) {
    motorP1.digitalWrite(1);
    motorP2.digitalWrite(0);
  } else {
    motorP1.digitalWrite(0);
    motorP2.digitalWrite(1);
  }
}, 100);

function close() {
  console.log('closing connection...');
  i2c1.closeSync();
  enablePin.pwmWrite(0);
  motorP1.digitalWrite(0);
  motorP2.digitalWrite(0);
  clearInterval(interval)
}

process.on('SIGINT', close); 
