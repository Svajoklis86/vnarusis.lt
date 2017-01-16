"use strict";

import gulp from "gulp";
import watch from "gulp-watch";

gulp.task('watch-tsc-client', ['tsc-client'], function() {
    return watch('./src/client/**/*', ['tsc-client']);
});