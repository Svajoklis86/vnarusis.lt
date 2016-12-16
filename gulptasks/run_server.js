"use strict";

import gulp from "gulp";
import { argv } from "yargs";
import gutil from "gulp-util";
import nodemon from "gulp-nodemon";

gulp.task("run-server", function () {
    let config = require("/dist/server/config.js");

    const configuration = {
        script: 'dist/server/application.js',
        ext: 'js html',
        env: { 'NODE_ENV': config.nodeEnv },
        watch: ["dist/server"]
    };

    nodemon(configuration);
});