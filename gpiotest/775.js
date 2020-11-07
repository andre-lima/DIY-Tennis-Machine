const i2c = require('i2c-bus');
const Gpio = require('pigpio').Gpio;

const enablePin1 = new Gpio(17, { mode: Gpio.OUTPUT });
const enablePin2 = new Gpio(27, { mode: Gpio.OUTPUT });

const ADDR = 0x4b;
const POT1_REG = 0x05;
const POT2_REG = 0x16;
const resolution = 16;

const i2c1 = i2c.openSync(1);

const interval = setInterval(() => {

  const rawData1 = i2c1.readWordSync(ADDR, POT1_REG);
  let speed1 = Math.floor(rawData1 * 255 / ((2 ** resolution) - 1));
  enablePin1.pwmWrite(speed1);

  const rawData2 = i2c1.readWordSync(ADDR, POT2_REG);
  let speed2 = Math.floor(rawData2 * 255 / ((2 ** resolution) - 1));
  enablePin2.pwmWrite(speed2);
  console.log(speed1, speed2)

  // if (range > 0) {
  //   motorP1.digitalWrite(1);
  //   motorP2.digitalWrite(0);
  // } else {
  //   motorP1.digitalWrite(0);
  //   motorP2.digitalWrite(1);
  // }
}, 100);

function close() {
  console.log('closing connection...');
  i2c1.closeSync();
  enablePin1.pwmWrite(0);
  // motorP1.digitalWrite(0);
  // motorP2.digitalWrite(0);
  clearInterval(interval)
}

process.on('SIGINT', close); 
