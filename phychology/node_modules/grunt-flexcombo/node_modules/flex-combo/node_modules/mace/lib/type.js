var util = exports;

function type (o) {
  return util.toString.call(o).slice(8, -1).toLowerCase();
}

util.type = type;
'String Function RegExp Error Object Number Boolean'.split(' ').forEach(function (name) {
  util['is' + name] = function (o) {
    return type(o) === name.toLowerCase();
  };
});
util.isArray = Array.isArray;
util.isNaN = Number.isNaN;
util.isFinite = Number.isFinite;
util.isBuffer = Buffer.isBuffer;
util.isGzip = function isGzip (buffer) {
  return  buffer[0] === 0x1F &&
    buffer[1] === 0x8B &&
    buffer[2] === 0x08;
};
util.isInt = function (o) {
  return o | 0 === o; 
}