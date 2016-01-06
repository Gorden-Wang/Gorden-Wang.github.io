/**
 * Created by yanhuiyi on 4/13/15.
 */
// 静态合并HTML和抽取JS/CSS，解析juicer语法到vm/php
// https://npmjs.org/package/grunt-combohtml
module.exports = exports = {
    options: {
        encoding: 'utf8',
            replacement: {
            from: /src\//,
                to: 'build/'
        },
        // 本地文件引用替换为线上地址
        relative: 'http://g.tbcdn.cn/<%= pkg.group %>/<%= pkg.name %>/<%= pkg.version %>/',
            tidy: false,  // 是否重新格式化HTML
            comboJS: false, // 是否静态合并当前页面引用的本地js
            comboCSS: false, // 是否静态合并当前页面引用的css
            convert2vm: false,// 是否将juicer语法块转换为vm格式
            convert2php: false // 是否将juicer语法块转换为php格式
    },
    main: {
        files: [
            {
                expand: true,
                cwd: 'build',
                // 对'*.php'文件进行HTML合并解析
                src: ['**/*.php'],
                dest: 'build/'
            }

        ]
    }
};