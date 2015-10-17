/**
 * Created by yanhuiyi on 4/13/15.
 */
module.exports = exports = {
    // prefix all files
    multiple_files: {
        options:{
            browsers: ['last 100 Opera versions','last 100 Android versions', 'last 100 and_ff versions','Firefox <= 20'],
                autoprefixer: true
        },
        expand: true,
            flatten: false,
            src: ['**/*.css'], // -> src/css/file1.css, src/css/file2.css
            dest: 'build/', // -> dest/css/file1.css, dest/css/file2.css
            cwd:'build/'
    },
    localhost_dev: {
        options:{
            browsers: ['last 100 Opera versions','last 100 Android versions', 'last 100 and_ff versions','Firefox <= 20'],
                autoprefixer: true
        },
        expand: true,
            flatten: false,
            src: ['**/*.css'], // -> src/css/file1.css, src/css/file2.css
            dest: 'src/', // -> dest/css/file1.css, dest/css/file2.css
            cwd:'src/'
    }
};