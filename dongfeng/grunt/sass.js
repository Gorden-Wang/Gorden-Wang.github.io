/**
 * Created by yanhuiyi on 4/13/15.
 */
module.exports = exports = {
    src: {

        files: [
            {
                expand: true,
                cwd: 'src/',
                src: ['**/*.scss'],
                dest: 'src/',
                ext: '.css'
            }
        ]
    }
    //, modified by shiqing ,
    //dist: {
    //
    //    files: [
    //        {
    //            expand: true,
    //            cwd: 'build/',
    //            src: ['**/*.scss'],
    //            dest: 'build/',
    //            ext: '.scss.css'
    //        }
    //    ]
    //}
};