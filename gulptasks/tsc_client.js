import gulp from "gulp";
import typescript from "gulp-tsc";

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import clean from "gulp-clean";

const cleanPipe = (callback) => {
    gutil.log("Cleaning...");

    gulp.src(["./compiled/client/**/*"], { read: false, base: "./compiled/client/" })
        .pipe(clean());

    if (callback) {
        callback();
    } else {
        gutil.log("No callback!");
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
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/js/'))
        .on("end", cleanPipe.bind(null, callback));
};

const compile = (callback) => {
    gutil.log("Compiling...");
    gulp.src([
        "./src/client/app/**/*.ts",
        "./node_modules/angular2/typings/browser.d.ts"
    ])
        .pipe(typescript({
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": [ "es2015", "dom", "es6" ],
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true,
            "rootDir": "src/client/app"
        }))
        .pipe(gulp.dest('./compiled/client'))
        .on("end", doBrowserify.bind(null, callback));
};

gulp.task('tsc-client', function (callback) {
    gutil.log("Starting...");
    compile(callback);
});

