import gulp from "gulp";
import { argv } from "yargs";
import gutil from "gulp-util";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";
import webpack from "gulp-webpack";

gulp.task("pack-server", function () {

    switch (argv.configuration) {
        case 'development':
            gutil.log("Using development configuration");
            gulp.src("src/server/configurations/development.config.js")
                .pipe(rename("config.js"))
                .pipe(gulp.dest("src/server/", {
                    overwrite: true
                }));
            break;
        case 'production':
            gutil.log("Using production configuration");
            gulp.src("src/server/configurations/production.config.js")
                .pipe(rename("config.js"))
                .pipe(gulp.dest("src/server/", {
                    overwrite: true
                }));
            break;
        default:
            gutil.log("Unknown configuration, reverting to development");
            gulp.src("src/server/configurations/development.config.js")
                .pipe(rename("config.js"))
                .pipe(gulp.dest("src/server/", {
                    overwrite: true
                }));
            break;
    }

    // gulp.src("server/**/*.js")
    //
    //         .pipe(babel())
    //         .pipe(concat("server.js"))
    //
    //     .pipe(gulp.dest("dist/server"));

    gulp.src("src/server/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/server"));
});