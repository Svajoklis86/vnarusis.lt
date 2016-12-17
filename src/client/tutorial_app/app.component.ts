import { Component } from "@angular/core";
import { config } from "./config";

const fs = require("fs");

@Component({
    selector: "vnarusis",
    template: `

    <h1>{{title}}</h1>
    <nav>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    </nav>
    
    <router-outlet></router-outlet>

`,
    styles: [ fs.readFileSync(__dirname + "/app.component.css", "utf8") ]
})
export class AppComponent {
    title = "Tour of Heroes";
};
