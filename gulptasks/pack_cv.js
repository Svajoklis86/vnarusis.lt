import gulp from "gulp";

gulp.task('pack-cv', ["sass-cv"], function () {
    gulp.src('./src/cv/cv.html')
        .pipe(gulp.dest('./dist/cv/'));
});