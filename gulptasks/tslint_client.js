"use strict";

import gulp from "gulp";
import { exec } from "child_process";

gulp.task("tslint-client", function (cb) {
    exec("cls");
    exec("tslint src/client/**/*.ts", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
});