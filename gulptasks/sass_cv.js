import gulp from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";

gulp.task('sass-cv', function () {
    return gulp.src('./src/cv/sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat("cv.css"))
        .pipe(gulp.dest('./static/style'));
});