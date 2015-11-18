/**
 * 本文件是 Gruntfile.js 默认模板，请根据需要和注释提示自行修改
 * 从这里获得最新版
 * https://github.com/jayli/generator-clam/blob/master/app/templates/Gruntfile_src.js
 */
var path = require('path'),
    clamUtil = require('clam-util'),
    exec = require('child_process').exec,
    fs = require('fs'),
    glob = require('glob'),
    _ = require('lodash');

module.exports = function (grunt) {
    var file = grunt.file;
    var task = grunt.task;
    var pathname = path.basename(__dirname);
    var source_files = clamUtil.walk('src',
        clamUtil.NORMAL_FILTERS,
        clamUtil.NORMAL_EXFILTERS);
    var all_files = (source_files.css || [])
        .concat(source_files.eot || [])
        .concat(source_files.otf || [])
        .concat(source_files.svg || [])
        .concat(source_files.ttf || [])
        .concat(source_files.woff || [])
        .concat(source_files.html || [])
        .concat(source_files.htm || [])
        .concat(source_files.js || [])
        .concat(source_files.less || [])
        .concat(source_files.css || [])
        .concat(source_files.png || [])
        .concat(source_files.gif || [])
        .concat(source_files.jpg || [])
        .concat(source_files.scss || [])
        .concat(source_files.php || [])
        .concat(source_files.swf || [])
        .concat(source_files.ico || [])
        .concat(source_files.json || [])
        .concat('!**/*/build/**');

    var relative = '';
    var base = 'https://ssl-static.youshop.com';
    var pkg = grunt.file.readJSON('abc.json');
    var daily = true;//是否解析css中的image
    var version = pkg.version;
    var versionTemp = pkg.versionTemp;
    var TARGET = grunt.option('target') || "local";

    if (TARGET === 'local' || TARGET === 'daily') {
        base = 'https://ssl-static-test.instarekber.com';
    }
    relative = base+"/upay/";

    var config = {
        pkg: grunt.file.readJSON('abc.json'),
        currentBranch: version || 'master',
        less: {
            options: {
                paths: './'
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**/*.less'],
                        dest: 'build/',
                        ext: '.less.css'
                    }
                ]
            }
        },

        copy: {
            mods: {
                files: [
                    {
                        expand: true,
                        src: 'mods.js',
                        dest: 'src/',
                        cwd: 'build/',
                        filter: 'isFile'
                    }
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        src: all_files,
                        dest: 'build/',
                        cwd: 'src/',
                        filter: 'isFile'
                    }
                ]
            },
            tpl: {
                files: [
                    {
                        src: 'build/pages/index/index.html',
                        dest: 'build/pages/template/templates/shop/info.html'
                    },
                    {
                        src: 'build/pages/item/index.html',
                        dest: 'build/pages/template/templates/item/info.html'
                    }
                ]
            }
        },

        kmc: {
            options: {
                depFilePath: 'build/mods.js',
                comboOnly: true,
                fixModuleName: true,
                comboMap: true,
                packages: [
                    {
                        ignorePackageNameInUri: true,
                        name: '<%= pkg.name %>',
                        path: '../',
                        charset: 'utf-8'
                    }
                ],
                //map: [['<%= pkg.name %>/src/', '<%= pkg.name %>/']]
                map: [
                    ['<%= pkg.name %>/build/', '<%= pkg.name %>/']
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        //cwd: 'src/',
                        cwd: 'build/',
                        src: source_files.js,
                        //dest: 'build/'
                        dest: 'src/'
                    }
                ]
            }
        },

        promote: {
            grunt_default: {
                options: {
                    questions: [
                        {
                            config: 'grunt_default',
                            type: 'list',
                            message: '是否对JS和CSS进行Combo?',
                            default: base.valueOf(),
                            choices: [
                                {
                                    value: 'yes',
                                    name: '合并JS和CSS'
                                },
                                {
                                    value: 'no',
                                    name: '不合并JS和CSS'
                                }
                            ]
                        }
                    ]
                }
            },
            uglify: {
                options: {
                    questions: [
                        {
                            config: 'grunt_uglify',
                            type: 'list',
                            message: '是否对静态资源进行压缩?',
                            default: "no",
                            choices: [
                                {
                                    value: 'yes',
                                    name: '压缩JS和CSS'
                                },
                                {
                                    value: 'no',
                                    name: '不压缩JS和CSS'
                                }
                            ]
                        }
                    ]
                }
            }
        },

        replace: {
            dist: {
                options: {
                    variables: {
                        'version': '<%= pkg.versionTemp %>'
                    },
                    prefix: '@@'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        dest: 'build/',
                        src: ['**/*']
                    }
                ]
            },
            script: {
                options: {
                    patterns: [
                        {
                            match: /<script[^>]+?src="([^"]+)"><\/script>/igm,
                            replacement: function (tag) {
                                var tt = tag.match(/<script[^>]+?src="([^"]+)"><\/script>/)[1];
                                return '<script src="' + tt + '?version=' + versionTemp + '"></script>'
                            }
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        dest: 'build/',
                        src: ['**/*.html']
                    }
                ]
            },
            css: {
                //<link[^>]+?href="([^"]+?)"[^>]*\/
                options: {
                    patterns: [
                        {
                            match: /<link[^>]+?href="([^"]+?)"[^>]*\/\s*>/gi,
                            //'<link href="$1?version='+version+'" type="text/css" rel="stylesheet"/>'
                            replacement: function (tag) {
                                var tt = tag.match(/<link[^>]+?href="([^"]+?)"[^>]*\/\s*>/)[1];
                                return '<link href="' + tt + '?version=' + versionTemp + '" type="text/css" rel="stylesheet"/>'
                                //return 123;
                            }

                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        //flatten : true,
                        cwd: 'build/',
                        dest: 'build/',
                        src: ['**/*.html']
                    }
                ]
            },
            img: {
                options: {
                    patterns: [
                        {
                            match: /url\s*\(["{0,1}](\S*)\s*["{0,1}]\)/gi,
                            //'<link href="$1?version='+version+'" type="text/css" rel="stylesheet"/>'
                            replacement: function (tag) {
                                var tt = tag.match(/url\s*\(["{0,1}](\S*)\s*["{0,1}]\)/)[1];
                                return tt.replace('../', relative);
                                //return 123;
                            }

                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        //flatten : true,
                        cwd: 'build/',
                        dest: 'build/',
                        src: ['**/*.css']
                    }
                ]
            }
        },

        template: {
            //本地
            server: {
                options: {
                    data: {
                        version: '?vdev=<%= pkg.version %>',
                        original_version: '<%= pkg.version %>',
                        staticBase: daily ? relative.substring(0, relative.length - 1) : "",
                        baseUrl: 'http://wd.test.youshop.com/vshop/1/H5',
                        h5Port: 'http://wd.test.youshop.com/vshop/1/H5',
                        pubPort: 'http://wd.test.youshop.com/vshop/1/public',
                        pubPort2: 'http://wd.test.youshop.com/ushop'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['build/**/*.js', '!build/lib/juicer.js', '!build/lib/libAll.js'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['build/**/*.html'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['build/**/*.css'],
                        dest: ''
                    }
                ]
            },
            //测试
            test: {
                options: {
                    data: {
                        version: '?vdev=<%= pkg.version %>',
                        original_version: '<%= pkg.version %>',
                        staticBase: "../../",

                        baseUrl: 'http://wd.test.youshop.com/vshop/1/H5',
                        h5Port: 'http://wd.test.youshop.com/vshop/1/H5',
                        pubPort: 'http://wd.test.youshop.com/vshop/1/public',
                        pubPort2: 'http://wd.test.youshop.com/ushop'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['build/**/*.js', '!build/lib/juicer.js', '!build/lib/libAll.js'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['build/**/*.html'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['build/**/*.css'],
                        dest: ''
                    }
                ]
            },
            //发布
            product: {
                options: {
                    data: {
                        version: '?vdev=<%= pkg.version %>',
                        original_version: '<%= pkg.version %>',
                        staticBase: daily ? relative.substring(0, relative.length - 1) : "",

                        baseUrl: 'http://wd.youshop.com/vshop/1/H5',
                        h5Port: 'http://wd.youshop.com/vshop/1/H5',
                        pubPort: 'http://wd.youshop.com/vshop/1/public',
                        pubPort2: 'http://wd.youshop.com/ushop',
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['build/**/*.js', '!build/lib/juicer.js', '!build/lib/libAll.js'],
                        dest: ''
                    },
                    {
                        expand: true,
                        src: ['build/**/*.css'],
                        dest: ''
                    }
                ]
            }
        },
        prompt: {
            grunt_default: {
                options: {
                    questions: [
                        {
                            config: 'grunt_default',
                            type: 'list',
                            message: '是否对JS和CSS进行Combo?',
                            default: base.valueOf(),
                            choices: [
                                {
                                    value: 'yes',
                                    name: '合并JS和CSS'
                                },
                                {
                                    value: 'no',
                                    name: '不合并JS和CSS'
                                }
                            ]
                        }
                    ]
                }
            },
            uglify: {
                options: {
                    questions: [
                        {
                            config: 'grunt_uglify',
                            type: 'list',
                            message: '是否对静态资源进行压缩?',
                            default: "no",
                            choices: [
                                {
                                    value: 'yes',
                                    name: '压缩JS和CSS'
                                },
                                {
                                    value: 'no',
                                    name: '不压缩JS和CSS'
                                }
                            ]
                        }
                    ]
                }
            }
        },

        exec: {
            tag: {
                command: 'git tag publish/<%= currentBranch %>'
            },
            publish: {
                command: 'git push origin publish/<%= currentBranch %>:publish/<%= currentBranch %>'
            },
            commit: {
                command: function (msg) {
                    console.log(grunt.config.get('currentBranch'))
                    var command = 'git commit -m "' + grunt.config.get('currentBranch') + ' - ' + grunt.template.today("yyyy-mm-dd HH:MM:ss") + ' ' + msg + '"';
                    return command;
                }
            },
            mastercommit: {
                command: function (msg) {

                    var command = 'git commit -m "' +'' + ' - ' + grunt.template.today("yyyy-mm-dd HH:MM:ss") + ' ' + msg + '"';
                    return command;
                }
            },
            push:{
                command :'git push origin master'
            },
            add: {
                command: 'git add .'
            },
            prepub: {
                command: 'git push origin daily/<%= currentBranch %>:daily/<%= currentBranch %>'
            },
            push_daily: {
                command: 'git push origin daily/<%= currentBranch %>:daily/<%= currentBranch %>'
            },
            grunt_publish: {
                command: function(msg) {
                    return  'grunt default:publish:' + msg;
                }
            },
            grunt_prepub: {
                command: function (msg) {
                    return 'grunt default:prepub:' + msg;
                }
            },
            new_branch: {
                command: 'git checkout -b daily/<%= currentBranch %>'
            },
            master : {
                command : 'git checkout master'
            },

            merge : {
                command : 'git merge daily/<%= currentBranch %>'
            },
            deletebranch : {
                command : 'git push origin --delete  daily/<%= currentBranch %> '
            },
            daily : {
                command : 'grunt daily'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            all: ['Gruntfile.js', 'src/**/*.js'],
            ignores:['src/lib/libAll.js','src/lib/zepto.js','src/lib/juicer.js']

        },
    };
    _.extend(config, loadConfig('./grunt/'));
    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('setenv', "Set up environment(local, daily and publish) in abc.json and common.js.", function (env) {
        if (!/(local|daily|publish)\b/gi.test(TARGET)) {
            console.log("Usage: grunt setenv:<env>, where only local, daily and publish are acceptable values of env.");
            return false;
        }

        try {
            var data = fs.readFileSync('src/lib/common.js', {encoding: 'utf-8'});
            var updateData = data.replace(/return\s*new\s+lib\("(local|daily|publish)"/g, 'return new lib("' + TARGET + '"');
            fs.writeFileSync('src/lib/common.js', updateData, {encoding: 'utf-8'});
            console.log('Value of evn in file common.js set up as ' + TARGET);
        } catch (ex) {
            console.log("Read or write file common.js error.");
            return false;
        }
    });

    grunt.registerTask('test', '开启Demo调试模式', function () {
        task.run(['jshint']);
    });

    /**
     * 启动Demo调试时的本地服务
     */
    grunt.registerTask('server', '开启Demo调试模式', function () {
        task.run(['setenv:local', 'configureRewriteRules', 'connect:server', 'connect:sslserver', 'watch:style']);
    });

    // 默认构建任务
    grunt.registerTask('exec_build', '默认构建任务', function () {
        base = grunt.config('grunt_default') || base;
        var action =
            ['setenv:publish',
                'concat',
                'clean:build',
                'clean:mods',
                'sass',
                'copy:main',
                'copy:mods'
            ];
        if (base == "yes") {
            //action.push("relativeurl");
        }
        action.push("clean:sass");
        var uglify = grunt.config('grunt_uglify') || 'no';
        action.push("autoprefixer:multiple_files");
        if (uglify == "yes") {
            action.push("uglify");
            action.push("cssmin");
        }
        if (TARGET == "local" || TARGET == "daily") {
            action.push("template:server");
        } else {
            action.push("template:product");
        }
        action.push("replace:css");
        action.push("replace:script");
        action.push("copy:tpl");
        task.run(action);
    });



    // 默认构建任务
    grunt.registerTask('build', 'build to publish', function () {
        setEvn('publish');
        var action = ['prompt:grunt_default', 'prompt:uglify', 'exec_build'];
        task.run(action);
    });

    grunt.registerTask('daily', 'daily调试', function () {
        daily = false;
        setEvn('daily');
        var action =
            ['setenv:daily',
                'concat',
                'clean:build',
                'clean:mods',
                'sass',
                'copy:main',
                'copy:mods'
            ];
        //action.push("relativeurl");
        action.push("clean:sass");
        action.push("template:server");
        action.push("replace:css");
        action.push("replace:script");
        action.push("autoprefixer:multiple_files");
        action.push("copy:tpl");
        task.run(action);
    });

    grunt.registerTask('prepub', '提交代码仓库', function (msg) {
        task.run(['exec:add', 'exec:commit:' + ("--deploy&project--" + msg || pkg.author.name)]);
        task.run(['exec:prepub']);
    });

    /*
     * 获取当前最大版本号，并创建新分支
     **/
    grunt.registerTask('newbranch', '创建新的分支', function (msg) {
        var done = this.async();
        exec('git branch -a & git tag', function (err, stdout, stderr, cb) {
            var r = clamUtil.getBiggestVersion(stdout.match(/\d+\.\d+\.\d+/ig));
            if (!r) {
                r = '0.1.0';
            } else {
                r[2]++;
                r = r.join('.');
            }
            grunt.log.write(('新分支：daily/' + r).green);
            grunt.config.set('currentBranch', r);
            task.run(['exec:new_branch']);
            // 回写入 abc.json 的 version
            try {
                abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
                abcJSON.version = r;
                clamUtil.fs.writeJSONFile("abc.json", abcJSON, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("update abc.json.");
                        task.run(['exec:add', 'exec:commit:' + ("--newbranch&project:" + msg || pkg.author.name), 'exec:push_daily']);
                    }
                });
            } catch (e) {
                console.log('未找到abc.json');
            }

            done();
        });
    });

    /**
     * 正式发布
     */
    grunt.registerTask('publish', 'clam 正式发布', function (msg) {
        task.run('exec:grunt_publish:' + msg);
    });
    grunt.registerTask('pub', 'clam 正式发布', function (msg) {
        task.run('exec:grunt_publish:' + msg);
    });

    // -------------------------------------------------------------
    // 注册Grunt主流程
    // -------------------------------------------------------------

    return grunt.registerTask('default', 'Clam 默认流程', function (type, msg) {

        var done = this.async();

        // 获取当前分支asdf
        exec('git branch', function (err, stdout, stderr, cb) {

            var reg = /\*\s+daily\/(\S+)/,
                match = stdout.match(reg);

            if (!match) {
                grunt.log.error('当前分支为 master 或者名字不合法(daily/x.y.z)，请切换到daily分支'.red);
                grunt.log.error('创建新daily分支：grunt newbranch'.yellow);
                grunt.log.error('只执行构建：grunt build'.yellow);
                return;
            }
            grunt.log.write(('当前分支：' + match[1]).green);
            grunt.config.set('currentBranch', match[1]);
            done();
        });

        // 构建和发布任务
        if (!type) {
            task.run(['build']);
        } else if ('publish' === type || 'pub' === type) {
            task.run(['exec:add', 'exec:commit:' + ("--publish&project:" + msg || pkg.author.name), 'exec:push_daily']);
            task.run(['exec:tag', 'exec:publish']);
        } else if ('prepub' === type) {
            task.run(['exec:add', 'exec:commit:' + ("--deploy&project:" + (msg || pkg.author.name))]);
            task.run(['exec:prepub']);
        }
    });

    function setEvn(tag) {
        base = 'https://ssl-static.instarekber.com';
        TARGET = tag

        if (TARGET === 'local' || TARGET === 'daily') {
            base = 'https://ssl-static-test.instarekber.com';
        }

        relative = base+"/upay/";

        grunt.config.set("relativeurl", {
            options: {
                encoding: 'utf8',
                replacement: {
                    from: /src\//,
                    to: 'build/'
                },
                relative: relative,
                combo: false
            },

            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        // 对'*.htm'文件进行HTML合并解析
                        src: ['**/*.html'],
                        dest: 'build/',
                        ext: '.html'
                    }
                ]
            }
        });
    }
};

function loadConfig(configPath) {
    var config = {};
    glob.sync('*', { cwd: configPath }).forEach(function (configFile) {
        var prop = configFile.replace(/\.js$/, '');
        config[prop] = require(path.join(__dirname, configPath, configFile));
    });
    return config;
}