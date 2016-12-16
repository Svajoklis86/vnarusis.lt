"use strict";

import gulp from "gulp";
import gutil from "gulp-util";
import rename from "gulp-rename";
import { argv } from "yargs";

const setServer = (cb) => {

    let stream = null;

    switch (argv.configuration) {
        case "development":
            gutil.log("Using development configuration");
            stream = gulp.src("src/server/configurations/development.config.js")
                .pipe(rename("config.js"));
            break;
        case "production":
            gutil.log("Using production configuration");
            stream = gulp.src("src/server/configurations/production.config.js")
                .pipe(rename("config.js"));
            break;
        default:
            gutil.log("!!! Unknown configuration, reverting to development !!!");
            stream = gulp.src("src/server/configurations/development.config.js")
                .pipe(rename("config.js"));

            break;
    }

    stream.pipe(gulp.dest("src/server/", {
        overwrite: true
    }))
        .on("end", cb);
};

const setClient = (cb) => {

    let stream = null;

    switch (argv.configuration) {
        case "development":
            gutil.log("Using development configuration");
            stream = gulp.src("src/client/app/configurations/development.config.ts")
                .pipe(rename("config.ts"));
            break;
        case "production":
            gutil.log("Using production configuration");
            stream = gulp.src("src/client/app/configurations/production.config.ts")
                .pipe(rename("config.ts"));
            break;
        default:
            gutil.log("!!! Unknown configuration, reverting to development !!!");
            stream = gulp.src("src/client/app/configurations/development.config.ts")
                .pipe(rename("config.ts"));
            break;
    }

    stream.pipe(gulp.dest("src/client/app/", {
            overwrite: true
        }))
        .pipe(rename("config.js"))
        .pipe(gulp.dest("src/client"))
        .on("end", cb);
};

gulp.task("set-configuration", (cb) => {
    switch (argv.component) {
        case "server":
            gutil.log("Setting configuration for server");
            setServer(cb);
            break;

        case "client":
            gutil.log("Setting configuration for client");
            setClient(cb);
            break;

        default:
            gutil.log("!!! Unknown component !!!");
            cb();
            break;
    }

});