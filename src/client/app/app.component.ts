import { Component } from "@angular/core";

import { config } from "./config";

@Component({
    selector: "my-app",
    template: `<h1>Hello {{config.tsc}}</h1>`,
})

export class AppComponent { config = config; }
