import gulp from "gulp";

gulp.task('watch-tsc-client', ['tsc-client'], function() {
    return gulp.watch('./src/client/app/**/*.ts', ['tsc-client']);
});