var util = require('../');
var debug = util.debug;
'1234567890'.split('').forEach(function (i) {
  var fn = debug('test:debug'+i);
  fn('this is test debug %s',i);
  util.each(fn, function (v, name) {
    if (typeof fn[name] === 'function') {
      fn[name]('this is sub command test');
    }
  });
});

var debug = util.debug('module:file');


debug.log('this is under debug log message');

debug('this is debug message');

// console.log(process.env, __dirname, require('path').resolve('./'));