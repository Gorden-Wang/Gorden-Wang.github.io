/**
 * Created by yanhuiyi on 4/13/15.
 */
module.exports = exports = {
    scss: {
        files: [
            {
                expand: true,
                cwd: 'build/',
                src: ['**/*.scss.css', '!**/*.scss-min.css'],
                dest: 'build/',
                ext: '.scss-min.css'
            }
        ]
    },
    less: {
        files: [
            {
                expand: true,
                cwd: 'build/',
                src: ['**/*.less.css', '!**/*.less-min.css'],
                dest: 'build/',
                ext: '.less-min.css'
            }
        ]
    },
    main: {
        files: [
            {
                expand: true,
                cwd: 'build/',
                src: ['**/*.css', '!**/*-min.css', '!**/*.less.css', '!**/*.scss.css'],
                dest: 'build/',
                ext: '.css'
                //ext: '.css'
            }
        ]
    }
};