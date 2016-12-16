"use strict";

import gulp from "gulp";

gulp.task("watch-cv", ["pack-cv"], function () {
    return gulp.watch("./src/cv/**/*", ["pack-cv"]);
});