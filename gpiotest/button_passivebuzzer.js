
// const Gpio = require('onoff').Gpio;
const pigpio = require('pigpio');
const Gpio = pigpio.Gpio;
const led = new Gpio(17, { mode: Gpio.OUTPUT });
const pushButton = new Gpio(18, {
  mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP,
  alert: true
});

const outPin = 17;

led.digitalWrite(0);
pigpio.waveClear()


pushButton.on('alert', function (level, _) {
  if (level) {
  }
});

let waveform = [];
 
for (let x = 0; x < 150; x++) {
  if (x % 2 === 1) {
    waveform.push({ gpioOn: outPin, gpioOff: 0, usDelay: x + 1 });
  } else {
    waveform.push({ gpioOn: 0, gpioOff: outPin, usDelay: x + 1 });
  }
}
 
pigpio.waveAddGeneric(waveform);
 
let waveId = pigpio.waveCreate();
 
if (waveId >= 0) {
  pigpio.waveTxSend(waveId, pigpio.WAVE_MODE_REPEAT);
}
 
while (pigpio.waveTxBusy()) {}
 
pigpio.waveDelete(waveId);