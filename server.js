const SerialPort = require('serialport')
const path = '/dev/tty.usbmodem14301';
// const serialport = new SerialPort(path)

hardwarePort = new SerialPort(path, {
    baudRate: 115200,
    autoOpen: true,
    parser: new SerialPort.parsers.Readline('\n')
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
hardwarePort.write('F');
