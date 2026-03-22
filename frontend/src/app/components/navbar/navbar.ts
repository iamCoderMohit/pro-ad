import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-navbar",
    imports: [],
    templateUrl: "./navbar.html"
})

export class Navbar {
    constructor(private router: Router) {}

    home() {
        this.router.navigate(["/"])
    }
    pages() {
        this.router.navigate(["/pages-list"])
    }
    signup() {
        this.router.navigate(["/signup"])
    }
    login() {
        this.router.navigate(["/login"])
    }
}