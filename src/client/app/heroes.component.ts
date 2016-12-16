import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hero } from "./hero";

import { HeroService } from "./hero.service";

const fs = require("fs");

@Component({
    selector: "my-heroes",
    template: fs.readFileSync(__dirname + "/heroes.component.html", "utf8"),
    styles: [ fs.readFileSync(__dirname + "/heroes.component.css", "utf8") ]
})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private heroService: HeroService,
        private router: Router
    ) {};

    ngOnInit(): void {
        this.getHeroes();
    };

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    };

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    };

    gotoDetail(): void {
        this.router.navigate(["/detail", this.selectedHero.id]);
    };

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    };

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    };
}