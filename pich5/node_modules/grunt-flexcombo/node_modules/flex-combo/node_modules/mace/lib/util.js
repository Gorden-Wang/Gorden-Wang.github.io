var fs = require('fs');
var type = require('./type.js');
var CORE_SLICE = Array.prototype.slice;
var CORE_SPLICE = Array.prototype.splice;
var crypto = require('crypto');
var util = exports;
util.merge = function () {
  var options;
  var name;
  var src;
  var copy;
  var clone;
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;

  // Handle a deep copy situation
  if (type.isBoolean(target)) {
    deep = target;

    // skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (!~'object function'.indexOf(typeof target)) {
    target = {};
  }

  // extend util itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[ i ]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (
          deep && 
          copy && 
          !!~'object array'.indexOf(type.type(copy))
        ) {
          if (type.isArray(copy)) {
            clone = src && type.isArray(src) ? src : [];
          } else {
            clone = src && type.isObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = util.merge(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
util.inherits = function (ctor, props, supper) {
  supper = Object.create((supper || Object).prototype, { constructor: {
    value: ctor,
    enumerable: false,
    writable: true,
    configurable: true
  }});
  ctor.prototype = util.merge(ctor.prototype, supper, props);
  return ctor;
};
util.splice = function (o, f, t, a) {
  return CORE_SPLICE.call(o,f,t,a);
};
util.clone = function () {
  util.splice(arguments, 0, 0, true);
  return util.merge.apply({}, arguments);
};

util.noop = function () {}

util.camelCase = function (name) {
  return (name || '').replace(/[^a-zA-Z]([a-z])/ig, function (a, m) {
    return String(m).toUpperCase();
  });
};

util.makeArray = util.slice = function (arrLike, f, t) {
  return CORE_SLICE.call(arrLike, f, t);
};
util.MD5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};
util.stripBOM = function (buffer) {
  if (buffer[0] === 0xFEFF) {
    buffer = buffer.slice(1);
  }
  if (
    buffer[0] === 0xEF &&
    buffer[1] === 0xBB &&
    buffer[2] === 0xBF
  ) {
    buffer = buffer.slice(3);
  }
  return buffer;
};

util.joinBuffer = function (bufferStore) {
  var length = bufferStore.reduce(function (previous, current) {
    return previous + current.length;
  }, 0);

  var data = new Buffer(length);
  var startPos = 0;
  bufferStore.forEach(function (buffer) {
    buffer.copy(data, startPos);
    startPos += buffer.length;
  });
  data = util.stripBOM(data);
  return data;
};
util.each = util.forEach = function (o, fn, context) {
  if (o.forEach) {
    return o.forEach(fn, context);
  }
  for (var i in o) {
    o.hasOwnProperty(i) && fn.call(context || o[i], o[i], i, o);
  }
};

util.loop = function (o, fn, context) {
  if (typeof o === 'string') {
    return util.each(o.split(/[\,\s\|]+/), fn, context);
  }
  util.each(o, fn, context);
};

util.map = function (o, fn, context) {
  if (o.map) {
    return o.map(fn, context)
  }
  var ret = {};
  util.each(o, function (v, i) {
    ret[i] = fn.call(this, v, i, o);
  }, context);
  return ret;
};

util.contains = util.some = function (o, fn, context) {
  if (o.some) {
    return o.some(fn, context)
  }
  for (var i in o) {
    if (o.hasOwnProperty(i) && fn.call(context || o[i], o[i], i, o)) {
      return true;
    }
  }
  return false;
};

util.every = function (o, fn, context) {
  if (o.every) {
    return o.every(fn, context)
  }
  for (var i in o) {
    if (o.hasOwnProperty(i) && !fn.call(context || o[i], o[i], i, o)) {
      return false;
    }
  }
  return true;
};

util.filter = function (o, fn, context) {
  if (o.filter) {
    return o.filter(fn, context)
  }
  var ret = {};
  for (var i in o) {
    if (o.hasOwnProperty(i) && fn.call(context || o[i], o[i], i, o)) {
      ret[i] = o[i];
    }
  }
  return ret;
};

var reEscape = /(\&|\>|\<|\`|\"|\')/gi;
var escapeEntry = {
  '"': "&quot;",
  '&': "&amp;",
  "'": "&#x27;",
  '<': "&lt;",
  '>': "&gt;",
  '`': "&#x60;"
};
util.escapeHTML = function (s) {
  return String(s).replace(reEscape, function (o, s) {
    return escapeEntry[s] || s;
  });
};
var reUnescape = /(&amp;|&gt;|&lt;|&#x60;|&quot;|&#x27;)/gi;
var unescapeEntry = {
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&#x60;': '`',
  '&quot;': '"',
  '&#x27;': "'"
};
util.unescapeHTML = function (s) {
  return String(s).replace(reUnescape, function (o, s) {
    return unescapeEntry[s] || s
  });
};

util.range = function (min, max) {
  if (null == max) {
    max = min;
    min = 0;
  }
  return min + (max + 1 - min) * Math.random();
}
util.MCString = function (l, zh) {
  var ret = '';
  var _lower = "abcdefghijklmnopqrstuvwxyz";
  var _upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var _number= "0123456789";
  var _usENSymbol = '`~!@#$%^&*()_+-={}[]:";\'<>,.?/|\\';
  var _zhCNSymbol = '·！￥……（）——【】“”‘’《》，。？、';
  var _usEN = _lower + _upper + _usENSymbol + _number;
  var _zhCN = '中文字符串' + _zhCNSymbol + _number;
  while (--l > 0) {
    var range = zh ? _zhCN : _usEN;
    ret += range[util.range(range.length - 1) | 0];
  }
  return ret;
}
util.pad = function (n, m, s, k) {
  m = m || 2;
  s = s || '0';
  n = '' + n;
  var l = m - n.length;
  if (!l) {return n}
  if (l > 0) {
    return new Array(-~l).join(s) + n;
  }
  return k ? n.slice(-l) : n;
}

util.stamp = function (date, formatStr) {
  date = new Date(date) || new Date;
  formatStr = formatStr || 'hh:mm:ss';
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var u = date.getMilliseconds();
  formatStr = formatStr.replace('yy', y).replace('y', util.pad(y, 2, '0', 0));
  util.each({
    M: M,
    d: d,
    h: h,
    m: m,
    s: s,
    u: u
  }, function (v,k) {
    formatStr = formatStr.replace(k + k, util.pad(v, 2, '0', 0));
    formatStr = formatStr.replace(k, v);
  });
  return formatStr;
};

util.Guid = function (prefix, max) {
  max = +('0x' + max) || 0xFFFFFFFF;
  prefix = prefix || 'id';
  function guid (l) {
    // 最大长度
    l = l || max.length;
    return pad((--max).toString(16).toUpperCase(), l);
  }
  return guid;
};

util.Uuid = function () {
  var seed = 0;
  function uuid () {
    var id = (new Date()).getTime() + '-' + (seed++).toString();
    seed %= 10000;
    return id;
  }
  return uuid;
};

util.guid = util.Guid();
util.uuid = util.Uuid();
util.toRegExpString = function (str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}