import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule }    from "@angular/http";

import { AppComponent }  from "./components/app.component";
import { AppRoutingModule } from "./app-routing.module";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { LandingComponent } from "./components/landing.component";

import './rxjs-extensions';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LandingComponent
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
