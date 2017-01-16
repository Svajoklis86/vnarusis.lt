import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);

$(document).ready(() => {

    const loader = $("#loader");

    const loaderCss = loader.css(["width", "height", "margin-left", "margin-top"]);

    loader
        .animate({
            "width": "+=25px",
            "height": "+=25px",
            "margin-left": "-=12px",
            "margin-top": "-=12px"
        }, { duration: 250 })
        .animate({
            "width": "0",
            "height": "0",
            "margin-left": "+=69px",
            "margin-top": "+=69px"
        }, { duration: 500, done: () => {
            loader.css(loaderCss);
            loader.css("display", "none");
        }});
});
