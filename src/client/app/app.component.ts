import { Component } from "@angular/core";
import { config } from "./config";

const fs = require("fs");

@Component({
    selector: "vnarusis",
    template: fs.readFileSync(__dirname + "/app.component.html", "utf8")
})
export class AppComponent {
    title = "VNarušis";
};
