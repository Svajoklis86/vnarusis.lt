import gulp from "gulp";
import { argv } from "yargs";
import gutil from "gulp-util";
import nodemon from "gulp-nodemon";

gulp.task("run-server", function () {

    const configuration = {
        script: 'dist/server/application.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        watch: ["dist/server"]
    };

    switch (argv.configuration) {
        case 'development':
            gutil.log("Using development configuration");
            configuration.env.NODE_ENV = 'development';
            break;
        case 'production':
            gutil.log("Using production configuration");
            configuration.env.NODE_ENV = 'production';
            break;
        default:
            gutil.log("Unknown configuration, reverting to development");
            configuration.env.NODE_ENV = 'development';
            break;
    }

    nodemon(configuration);
});