var http = require('http');
var url = require('url');
var Duplex = require('stream').Duplex;

var server = http.createServer(function (req, res) {
  var remote = 'http://ladygo.tmall.com/json/ajaxGetNav.json?spm=a1z4r.7404975.brand_today.1.T4Fkok&minisiteId=130&t=1412905667691';
  var remoteInfo = url.parse(remote);
  remoteInfo.path = remoteInfo.path + '&' + (url.parse(req.url).query || '');
  remoteInfo.method = req.method;
  remoteInfo.agent = false;
  remoteInfo.headers = req.headers;
  var stream = new Duplex;
  stream.pipe(res);
  var nsreq = http.request(remoteInfo, function (nsres) {
    nsres.pipe(stream);
  });
  req.pipe(nsreq, {end:true});
}).listen(8000);
