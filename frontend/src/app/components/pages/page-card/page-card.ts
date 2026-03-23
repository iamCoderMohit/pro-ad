import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import {NgIconComponent} from '@ng-icons/core'
import { Pages } from "../../../services/pages";

@Component({
    selector: "app-page-card",
    standalone: true,
    templateUrl: "./page-card.html",
    imports: [NgIconComponent]
})

export class PageCard {
    @Input() name!: string  
    @Input() category!: string  
    @Input() id!: string  
    @Input() isHome!: boolean

    constructor(private router: Router, private pageService: Pages) {}

  pageDetail(id: string) {
    this.router.navigate(['/pages-list', id]);
  }

  editPage(id: string) {
    this.router.navigate(['/edit-page', id])
  }

  pageDelete(id: string) {
    console.log("click")
    this.pageService.deletePage(id).subscribe({})
    this.router.navigate(['/pages-list'])
  }
}