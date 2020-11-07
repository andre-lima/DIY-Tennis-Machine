const i2c = require('i2c-bus');
const Gpio = require('pigpio').Gpio;

const PWM_RANGE = 32768;
const enablePin1 = new Gpio(17, { mode: Gpio.OUTPUT });
enablePin1.pwmRange(PWM_RANGE)
const enablePin2 = new Gpio(27, { mode: Gpio.OUTPUT });
enablePin2.pwmRange(PWM_RANGE)

const ADDR = 0x4b;
const POT1_REG = 0x05;
const POT2_REG = 0x16;
const resolution = 16;

const i2c1 = i2c.openSync(1);

const interval = setInterval(() => {

  const rawData1 = i2c1.readWordSync(ADDR, POT1_REG);
  let speed1 = Math.floor(rawData1 * PWM_RANGE / ((2 ** resolution) - 1));
  enablePin1.pwmRange(32768)
  enablePin1.pwmWrite(speed1);

  const rawData2 = i2c1.readWordSync(ADDR, POT2_REG);
  let speed2 = Math.floor(rawData2 * PWM_RANGE / ((2 ** resolution) - 1));
  enablePin2.pwmWrite(speed2);
  console.log(speed1, speed2)
}, 100);

function close() {
  console.log('closing connection...');
  i2c1.closeSync();
  enablePin1.pwmWrite(0);
  enablePin2.pwmWrite(0);
  clearInterval(interval)
}

process.on('SIGINT', close); 
