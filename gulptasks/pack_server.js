import gulp from "gulp";
import { argv } from "yargs";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";

gulp.task("pack-server", () => {
    return gulp.src("src/server/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/server"));
});