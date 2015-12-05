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

var _core_slice = [].slice;
var tty = require('tty');
var enabled = exports.enabled = !process.env.NOCOLOR && 
  tty.isatty(1) && 
  tty.isatty(2);
Object.keys(styles).forEach(function (style) {
  var color = styles[style];
  styles[style] = !exports.enabled ? function (s) {
    return s;
  } : function (s) {
    return color.join(s);
  }
});
exports.styles = styles;
exports.tinyColors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'grey','black'];
// for future hight light support
function hightlight (str) {
  return str;
}
exports.stringify = function (obj, deep, objCache) {
  var deep = deep || 0;
  var tabStr = new Array(deep + 1).join('  ');
  var objCache = objCache || [];
  var type = styles.toString.call(obj).slice(8, -1).toLowerCase();
  switch(type) {
    case 'function' : {
      // function 转化为函数定义
      return deep ? '[Function '+(obj.name || 'anonymous')+']' : hightlight(obj.toString());
    }
    case 'arguments':
    case 'object': {
      // 
      if (!~objCache.indexOf(obj)) {
        objCache.push(obj);
        var ret = [];
        Object.keys(obj).forEach(function (k) {
          var v = obj[k];
          if (!~objCache.indexOf(v)) {
            v = exports.stringify(v, deep + 1, objCache);
          } else {
            v = styles.yellow('[Circle object]');
          }
          var k = exports.stringify(k);
          ret.push(tabStr + '  '+ k + ': ' + v);
        });
        return '{\r\n' + ret.join(',\r\n') + '\r\n' + tabStr + '}';
      }
      return styles.yellow('[Circle object]');
    }
    case 'array': {
      if (!~objCache.indexOf(obj)) {
        objCache.push(obj);
        var ret = [];
        obj.forEach(function (v) {
          if (!~objCache.indexOf(v)) {
            v = exports.stringify(v, deep + 1, objCache);
          } else {
            v = styles.yellow('[Circle array]');
          }
          ret.push(tabStr + '  ' + v);
        });
        return '[\r\n' + ret.join(',\r\n') + '\r\n' + tabStr + ']';
      }
      return styles.yellow('[Circle Array]');
    }
    case 'string': {
      var ret = styles.yellow(obj.toString());
      if (deep) {
        return '"' + ret + '"';
      }
      return ret;
      // return '"' + styles.yellow(obj.toString()) +'"';
    }
    case 'number': {
      return styles.cyan(obj.toString());
    }
    case 'regexp':{
      return styles.magenta(obj.toString())
    }
    case 'boolean': {
      return styles.red(obj.toString());
    }
    case 'date': {
      return styles.green(obj.toString());
    }
    case 'undefined':
    case 'null': {
      return styles.grey('' + obj);
    }
    case 'error': {
      return styles.red(obj.message + '\r\n') + 
        styles.red(tabStr + obj.stack.replace(/\n\r*/g, '\r\n' + tabStr + '  '));
    }
    default: {
      return tabStr + obj.toString();
    }
  }
};

exports.format = function (str, args) {
  if (!str) {
    var ret = [];
    args.forEach(function (val) {
      ret.push(exports.stringify(val));
    });
    return ret.join('\r\n');
  }
  str = str.replace(/\%([a-z\%])/ig, function (s, m) {
    if (m === '%') {
      return '%';
    }
    return exports.stringify(args.shift());
  });
  while(args.length) {
    str += exports.stringify(args.shift());
  }
  return str;
};
exports.tripColors = function (s) {
  return s.replace(/\x1B\[\d+m/g, '');
};

exports.soules = [
  [ // highs
    '̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒',  '͗',
    '͑',  '̇', '̈', '̊', '͂',  '̓', '̈', '͊',  '͋',  '͌',
    '̃', '̂', '̌', '͐',  '̀', '́', '̋', '̏', '̒', '̓',
    '̔', '̽', '̉', 'ͣ',  'ͤ',  'ͥ',  'ͦ',  'ͧ',  'ͨ',  'ͩ',
    'ͪ',  'ͫ',  'ͬ',  'ͭ',  'ͮ',  'ͯ',  '̾', '͛',  '͆',  '̚'
  ],
  [ // mids
    '̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵',
    '̶', '͜',  '͝',  '͞',  '͟',  '͠',  '͢',  '̸', '̷', '͡', '҉'
  ],
  [ // lows
    '̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤',
    '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰',
    '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ',  '͇',  '͈',
    '͉',  '͍',  '͎',  '͓',  '͔',  '͕',  '͖',  '͙',  '͚',  '̣'
  ]
];