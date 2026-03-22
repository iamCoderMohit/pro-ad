import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-page-card",
    standalone: true,
    templateUrl: "./page-card.html"
})

export class PageCard {
    @Input() name!: string  
    @Input() category!: string  
    @Input() id!: string  

    constructor(private router: Router) {}

  pageDetail(id: string) {
    this.router.navigate(['/pages-list', id]);
  }
}