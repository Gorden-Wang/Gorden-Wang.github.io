var util = require('../');

util.Command('clam', '初始化项目').
  command('test').
  option('-t, --text [abc]', 'Test options').
  action(function () {
    util.log('init', arguments)
  })
.action(function () {
  util.log('default', arguments);
}).parse(process.argv);

util.log(util.merge([1,2,3],[4,5,6]))