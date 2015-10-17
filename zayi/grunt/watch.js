/**
 * Created by yanhuiyi on 4/13/15.
 */
// 监听JS、CSS、LESS文件的修改
module.exports = exports = {
    'style': {
        files: ['src/**/*.scss'],
        tasks: ['newer:sass:src']
    },

    'autoprefix': {
        files: ['src/**/*.css'],
            tasks: ['autoprefixer:localhost_dev']
    },

    'all': {
        files: ['src/**/*.js',
            'src/**/*.css',
            'src/**/*.less',
            'src/**/*.php',
            'src/**/*.html',
            'src/**/*.htm',
            'src/**/*.scss'],
            tasks: [ 'build' ]
    },
    'daily':{
        files: ['src/**/*.js',
            'src/**/*.css',
            'src/**/*.less',
            'src/**/*.php',
            'src/**/*.html',
            'src/**/*.htm',
            'src/**/*.scss'],
            tasks: [ 'daily' ]
    }
};