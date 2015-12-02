#Mace is a pure tools for nodejs 

Not like underscore, this is all for NodeJs.

# How to use

```
var util = require('mace')(module);
// live load file and support ason (active json file);
// -
// |-> demo.ason
// 
// @example demo.ason
// {
//    // support comment for json in ason
//    "test": true 
// }
//  util.use('./demo.ason'); 
// =>  {
//    "test": true
// }
// 
```

*Why mace need the module?* 
`Because need live load files under current module path`

## All api supports

```
util.each === util.forEach
util.map
util.filter
util.some
util.every

util.merge === jQuery.extend
// util.inherits(constructor, prototypes, supper);
util.inherits
util.splice === [].splice.call
util.slice === [].slice.call
util.clone === util.merge(true, {}, otherObjects);
// a-b => aB;
util.camelCase
util.makeArray === util.slice
util.MD5 
util.escapeHTML
util.unescapeHTML
// util.range(1,10) => random min = 1 max =10
util.range
// util.MCString for no mockjs magic string
util.MCString 
// util.pad(0,2) => '00'
util.pad 
// 12312312313 => 2011-02-03 12:10:11
util.stamp
// util.Guid('clam') => function () {} 
// clamxxxxx
util.Guid
```


```
util.type
util.isObject
util.isNumber
util.isArray
util.isNaN
util.isFunction
util.isError
util.isBuffer
util.isGzip
```


```
util.log
util.warn
util.error
util.trace
util.info
// tiny log no timestamp no line no filepath
util.logue
util.debug

util.debug(xxx).log
util.debug(xxx).warn
util.debug(xxx).error
util.debug(xxx).trace
util.debug(xxx).info
// tiny log no timestamp no line no filepath
util.debug(xxx).logue

util.line() => file:line:charsite
```


```
util.Command
util.Command().command
util.Command().option
```