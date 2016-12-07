import gulp from "gulp";
import rename from "gulp-rename";
import concat from "gulp-concat";
import gutil from 'gulp-util';

gulp.task("pack-client", ["sass-client", "tsc-client"], function (callback) {
    let done = 0;
    const fn = () => {
        done += 1;
        if (done == 2) {
            callback();
        }
    };

    gulp.src("./src/client/index.html")
        .pipe(rename("client.html"))
        .pipe(gulp.dest("./dist/client/"))
        .on("end", fn);

    gulp.src([
        "./node_modules/core-js/client/shim.min.js",
        "./node_modules/zone.js/dist/zone.js",
        "./node_modules/reflect-metadata/Reflect.js",
        "./node_modules/systemjs/dist/system.src.js",
        "./src/client/systemjs.config.js"])
        .pipe(concat("client_lib.js"))
        .pipe(gulp.dest("./static/js"))
        .on("end", fn);
});