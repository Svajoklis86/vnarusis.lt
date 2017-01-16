"use strict";

import gulp from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";

gulp.task("sass-client", function () {
    return gulp.src("./src/client/sass/**/*.scss")
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(gulp.dest("./static/style"));
});