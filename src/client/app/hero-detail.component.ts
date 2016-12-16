import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { Hero } from "./hero";
import { HeroService } from "./hero.service";

const fs = require("fs");

@Component({
    selector: "my-hero-detail",
    template: fs.readFileSync(__dirname + "/hero-detail.component.html", "utf8"),
    styles: [ fs.readFileSync(__dirname + "/hero-detail.component.css", "utf8") ]
})
export class HeroDetailComponent implements OnInit {

    constructor (
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { };

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(Number(params["id"])))
            .subscribe(hero => this.hero = hero);
    };

    hero: Hero;

    goBack(): void {
        this.location.back();
    };

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    };
}