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
            middleware: function(connect, options) {
                var middlewares = [];
                middlewares.push(rewriteRulesSnippet);
                if(!Array.isArray(options.base)) {
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
            middleware: function(connect, options) {
                var middlewares = [];
                middlewares.push(rewriteRulesSnippet);
                if(!Array.isArray(options.base)) {
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
    }
};

function setMiddleware () {
    var config = {};
    config['middlewares'] = function(connect, options) {
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
