import { Component, OnInit } from "@angular/core";
import { Hero } from "./hero";
import { HeroService } from "./hero.service";

const fs = require("fs");

@Component({
    selector: "my-dashboard",
    template: fs.readFileSync(__dirname + "/dashboard.component.html", "utf8"),
    styles: [ fs.readFileSync(__dirname + "/dashboard.component.css", "utf8") ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { };

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}