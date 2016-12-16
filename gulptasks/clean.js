"use strict";

import gulp from "gulp";
import gutil from "gulp-util";
import clean from "gulp-clean";
import merge from "merge-stream";

gulp.task("clean", () => {
    gutil.log("Cleaning...");

    let compiled = gulp.src(["./compiled/**/*"], { read: false, base: "./compiled/" })
        .pipe(clean());

    let style = gulp.src(["./static/style/**/*"], { read: false, base: "./static/style/" })
        .pipe(clean());

    let js = gulp.src(["./static/js/**/*"], { read: false, base: "./static/js/" })
        .pipe(clean());

    let dist = gulp.src(["./dist/**/*"], { read: false, base: "./dist/" })
        .pipe(clean());

    return merge(compiled, style, js);
});