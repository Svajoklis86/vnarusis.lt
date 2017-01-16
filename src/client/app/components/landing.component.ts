import { Component, AfterViewInit } from "@angular/core";

const fs = require("fs");

@Component({
    selector: "landing",
    template: fs.readFileSync(__dirname + "/../templates/landing.component.html", "utf8")
})
export class LandingComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        (<any>$('.collapsible')).collapsible();
        (<any>$('.modal')).modal();
    }
}