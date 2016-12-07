import gulp from "gulp";

gulp.task("watch-cv", function () {
    return gulp.watch("./src/cv/**/*", ["pack-cv"]);
});