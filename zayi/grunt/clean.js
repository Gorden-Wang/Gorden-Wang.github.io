/**
 * Created by yanhuiyi on 4/13/15.
 */
// 对build目录进行清理
module.exports = exports = {
    mods: {
        src: 'src/mods.js'
    },
    sass: {
        src: 'build/**/*.scss'
    },
    build: {
        src: ['build/**/*','!build/**/.svn'],
            filter: 'isFile'
    }
};