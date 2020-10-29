
const Gpio = require('onoff').Gpio;
const LED = new Gpio(17, 'out');
const pushButton = new Gpio(18, 'in', 'both', {debounceTimeout: 10});

pushButton.watch(function (err, value) {
  console.log(value)
  if (err) { //if an error
    console.error('There was an error', err);
    return;
  }
  LED.writeSync(value);
});

function unexportOnClose() {
  console.log(' > off');
  LED.writeSync(0);
  LED.unexport();
  pushButton.unexport();
};

process.on('SIGINT', unexportOnClose); 