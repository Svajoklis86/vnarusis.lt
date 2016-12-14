import gulp from "gulp";
import typescript from "gulp-tsc";

import { argv } from "yargs";
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import clean from "gulp-clean";
import gulpIf from "gulp-if";
import merge from "merge-stream";
import rename from "gulp-rename";
import concat from "gulp-concat";
import notifier from "node-notifier";
import plumber from "gulp-plumber";

import { config } from "/src/client/config.js";

const cleanPipe = (callback, compilationOK) => {
    gutil.log("Cleaning...");

    let cleanTask = gulp.src(["./compiled/client/**/*"], { read: false, base: "./compiled/client/" })
        .pipe(clean());

    if (callback) {
        if (compilationOK) {
            notifier.notify({
                "title": "tsc",
                "message": "Compilation OK!"
            });
        }
        callback();
    }
};

const doBrowserify = (callback) => {
    gutil.log("Bundling...");
    const b = browserify({
        entries: './compiled/client/main.js',
        debug: true
    });

    b.bundle()
        .pipe(source('client.js'))
        .pipe(buffer())
        .pipe(gulpIf(config.isDevelopment, sourcemaps.init({loadMaps: true})))
        // Add transformation tasks to the pipeline here.
        .pipe(gulpIf(!config.isDevelopment, uglify()))
        .on('error', gutil.log)
        .pipe(gulpIf(config.isDevelopment, sourcemaps.write('./')))
        .pipe(gulp.dest('./static/js/'))
        .on("end", cleanPipe.bind(null, callback, true));
};

const compile = (callback) => {
    gutil.log("Compiling...");

    let source = gulp.src([
        "./src/client/app/**/*.ts",
        "./node_modules/angular2/typings/browser.d.ts"
    ]);

    let failed = false;

    merge(source)
        .pipe(typescript({
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": [ "es2015", "dom", "es6" ],
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true
        }))
        .on("error", function () {
            failed = true;
            this.emit("end");
        })
        .pipe(gulp.dest('./compiled/client'))
        .on("end", () => {
            if (!failed) {
                doBrowserify(callback);
            } else {
                callback();
                notifier.notify({
                    "title": "tsc",
                    "message": "Compilation failed!"
                });
            }
        });

};

gulp.task('tsc-client', ["pack-client"], function (callback) {
    gutil.log("Starting..." + (config.isDevelopment ? " in development mode" : ""));
    compile(callback);
});

