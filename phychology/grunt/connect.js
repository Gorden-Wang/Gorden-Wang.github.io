/**
 * Created by yanhuiyi on 4/13/15.
 */
//var rewriteModule = require('http-rewrite-middleware');
var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
var _ = require('lodash');

//module.exports = exports = (function(){
//    var config = {
//        hostname: 'wd.local.youshop.com',
//
//        rules: [
//            {from: '^/upay/(.*)$', to: '/$1'}
//        ],
//
//        sslserver: {
//            options: {
//                protocol: 'https',
//                port: '443',
//                base: 'src'
//            }
//        },
//        server: {
//            options: {
//                protocal: 'http',
//                port: '80',
//                base: 'src'
//            }
//        }
//    };
//    _.extend(config.server.options, setMiddleware());
//    _.extend(config.sslserver.options, setMiddleware());
//    _.extend(config, {hostname: "wd.local.youshop.com"});
//
//    return config;
//})();

module.exports = exports = {
    options: {
        hostname: '*'
    },
    rules: [
        {from: '^/upay/(.*)$', to: '/$1'}
    ],
    sslserver: {
        options: {
            protocol: 'https',
            port: '443',
            middleware: function (connect, options, middlewares) {


                //middlewares.unshift(function(req, res, next) {
                //
                //    console.log(req.url);
                //    if (req.url !== '/hello/world') return next();
                //
                //    res.end('Hello, world from port #' + options.port + '!');
                //});
                //
                //return middlewares;
                var middlewares = [];
                middlewares.push(rewriteRulesSnippet);
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                var directory = options.directory || options.base[options.base.length - 1];
                options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
                });
                middlewares.push(connect.directory(directory));
                return middlewares;
            },
            base: ['src', 'DOKU_template']
        }
    },
    server: {
        options: {
            protocal: 'http',
            port: '80',
            middleware: function (connect, options, middlewares) {
                //var middlewares = [];
                //middlewares.push(rewriteRulesSnippet);
                //if (!Array.isArray(options.base)) {
                //    options.base = [options.base];
                //}
                //var directory = options.directory || options.base[options.base.length - 1];
                //options.base.forEach(function (base) {
                //    middlewares.push(connect.static(base));
                //});
                //middlewares.push(connect.directory(directory));
                //return middlewares;

                console.log(middlewares)

                middlewares.unshift(function (req, res, next) {
                    if (req.url.indexOf("zayi/app") > -1) {
                        //zayi
                        (function () {
                            var Request = require("request");
                            var querystring = require("querystring");
                            //var http = require("http");
                            var url = require("url");
                            var RouterURL = "http://icefox-cool.xicp.net";
                            var info = "";
                            var path = url.parse(req.url);
                            var postData = "";
                            var u = RouterURL + path.path;
                            if (req.method === "GET") {
                                console.log(u);
                                //Request.get("http://icefox-cool.xicp.net/zayi/app/resources/tags",function(e,h,r){
                                //    res.end(r);
                                //});
                                //Request("http://icefox-cool.xicp.net/zayi/app/resources/tags",function(e,h,r){
                                //    res.end(r);
                                //})
                                Request.get({
                                    url: "http://icefox-cool.xicp.net/zayi/app/resources/tags",
                                    headers: {
                                        Host: "icefox-cool.xicp.net",
                                        //Origin: "http://icefox-cool.xicp.net"
                                    }
                                }, function (e, h, r) {
                                    res.end(r);
                                })
                            } else {
                                //req.pipe(Request.post(u)).pipe(res);


                            }


                            req.addListener("data", function (postDataChunk) {
                                postData += postDataChunk;

                                console.log(postData)
                            });

                            req.addListener("end", function (postDataChunk) {

                                if(req.method == "GET"){
                                    return;
                                }
                                var data = querystring.parse(postData);
                                Request.post({
                                    url: RouterURL + req.url.split("?")[0],
                                    form: data,
                                    headers: {
                                        Host: "icefox-cool.xicp.net",
                                        Origin: "http://icefox-cool.xicp.net"
                                    }
                                }, function (e, h, b) {
                                    console.log(e);
                                    console.log(h.headers);

                                    if (h.headers['set-cookie']) {
                                        res.writeHead(200, {
                                            'Set-Cookie': h.headers['set-cookie']
                                        })
                                    }
                                    res.end(b);
                                })


                            });


                        })();
                    } else {
                        return next();
                    }

                    //if (req.url !== '/hello/world') return next();
                    //
                    //res.end('Hello, world from port #' + options.port + '!');
                });

                return middlewares;


            },
            base: ['src', 'DOKU_template']
        }
    }
};

function setMiddleware() {
    var config = {};
    config['middlewares'] = function (connect, options) {
        var middlewares = [];
        middlewares.push(rewriteRulesSnippet);
        if (!Array.isArray(options.base)) {
            options.base = [options.base];
        }
        var directory = options.directory || options.base[options.base.length - 1];
        options.base.forEach(function (base) {
            // Serve static files.
            middlewares.push(connect.static(base));
        });
        // Make directory browse-able.
        middlewares.push(connect.directory(directory));
        return middlewares;
    }
    return config;
}
