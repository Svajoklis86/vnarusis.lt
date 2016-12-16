"use strict";

import gulp from "gulp";
import rename from "gulp-rename";
import concat from "gulp-concat";
import gutil from "gulp-util";
import merge from "merge-stream";

gulp.task("pack-client", ["sass-client"], function (callback) {

    const html = gulp.src("./src/client/index.html")
        .pipe(rename("client.html"))
        .pipe(gulp.dest("./dist/client/"));

    const js = gulp.src([
        "./node_modules/core-js/client/shim.min.js",
        "./node_modules/zone.js/dist/zone.js",
        "./node_modules/reflect-metadata/Reflect.js",
        "./src/client/systemjs.config.js"])
        .pipe(concat("client_lib.js"))
        .pipe(gulp.dest("./static/js"));

    return merge(html, js);
});