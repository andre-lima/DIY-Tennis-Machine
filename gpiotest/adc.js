const i2c = require('i2c-bus');

const ADDR = 0x4b;
const POT_REG = 0x05;
const resolution = 16;

// i2c.openPromisified(1).
// then(i2c1 => i2c1.readWord(ADDR, POT_REG).
//   then(measure => {
//     const volts = measure * 3.3 / 255;
//     console.log(volts)
//   }).
//   then(_ => i2c1.close())
// ).catch(console.log);

const i2c1 = i2c.openSync(1);

const interval = setInterval(() => {
  const rawData = i2c1.readWordSync(ADDR, POT_REG);
  const volts = rawData * 3.3 / (2 ** resolution)
  console.log(volts)
}, 100);

setTimeout(() => {
  console.log('closing connection...');
  i2c1.closeSync();
  clearInterval(interval)
}, 9000);
