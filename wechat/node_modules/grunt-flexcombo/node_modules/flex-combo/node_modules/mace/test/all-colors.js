// var util = require('../');
// var cmd = util.cmd('clam','For clam version help');

// cmd.version('1.0.0')
//   .option('-p, --port <port>', 'Server port', 80)
//   .option('-r, --root [path]', 'The root for server ', process.cwd())
//     .command('on [type]', 'Start the server with type', 'pc')
//     .option('-t, --test [mode]', 'Test')
//     .option('-N, --no-noop', 'test no')
//     .action(function (vals) {
//       util.log('do on', vals)
//     })
//   .action(function () {
//     util.log('do default', arguments);
//   }).parse(process.argv);

// // util.log('Random string is %s', util.randomStr(10));

var styles = {
  'bold':      ['\033[1m', '\033[22m'],
  'italic':    ['\033[3m', '\033[23m'],
  'underline': ['\033[4m', '\033[24m'],
  'inverse':   ['\033[7m', '\033[27m'],
  'black':     ['\033[30m', '\033[39m'],
  'red':       ['\033[31m', '\033[39m'],
  'green':     ['\033[32m', '\033[39m'],
  'yellow':    ['\033[33m', '\033[39m'],
  'blue':      ['\033[34m', '\033[39m'],
  'magenta':   ['\033[35m', '\033[39m'],
  'cyan':      ['\033[36m', '\033[39m'],
  'white':     ['\033[37m', '\033[39m'],
  'default':   ['\033[39m', '\033[39m'],
  'grey':      ['\033[90m', '\033[39m'],
  'bgBlack':   ['\033[40m', '\033[49m'],
  'bgRed':     ['\033[41m', '\033[49m'],
  'bgGreen':   ['\033[42m', '\033[49m'],
  'bgYellow':  ['\033[43m', '\033[49m'],
  'bgBlue':    ['\033[44m', '\033[49m'],
  'bgMagenta': ['\033[45m', '\033[49m'],
  'bgCyan':    ['\033[46m', '\033[49m'],
  'bgWhite':   ['\033[47m', '\033[49m'],
  'bgDefault': ['\033[49m', '\033[49m']
};
Object.keys(styles).forEach(function (n) {
  console.log('The %s is %s %s %s;', n, styles[n][0], n, styles[n][1]);
});
var i = 6;
do {
  var s = ['Test Color `',i,'`\n'];
  [3,4,9,10].forEach(function (j) {
    s.push('\n\t\u001b[');
    s.push(j);
    s.push(i);
    s.push('m Color [ j = `');
    s.push(j);
    s.push('`; i = `');
    s.push(i);
    s.push('`; ]\u001b[0m');      
  });
  console.log(s.join(''));
} while(i--);