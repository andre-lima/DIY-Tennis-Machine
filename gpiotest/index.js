var rpio = require('rpio');

rpio.open(15, rpio.INPUT);
console.log('Pin 15 is currently ' + (rpio.read(15) ? 'high' : 'low'));
