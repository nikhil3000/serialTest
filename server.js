// This code sends what you type on terminal to a serial port

const SerialPort = require('serialport')
const path = 'COM3';
// const serialport = new SerialPort(path)

hardwarePort = new SerialPort(path, {
    baudRate: 115200,
    autoOpen: true
  })

const {
  parsers: { Readline }
} = SerialPort

parser = new Readline()
hardwarePort.pipe(parser)

hardwarePort.on('open', () => {
  console.log('opened')
})
hardwarePort.on('close', () => {
  console.log('closed')
})
hardwarePort.on('error', err => {
  console.log(err)
})

parser.on('data', serialData => {
    console.log(serialData);
});

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    hardwarePort.write(d.toString().trim()) //If using nrf change this to hardwarePort.write(d.toString().trim() + '\r')
  });

