import { Component, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Pages } from "../../../services/pages";

@Component({
    selector: "app-page-details",
    standalone: true,
    imports: [RouterModule],
    templateUrl: "./page-detail.html"
})

export class PageDetail implements OnInit {
    constructor(private route: ActivatedRoute, private pageService: Pages) {
        console.log("rooute", route)
    }     

    page = signal<any>([])

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    console.log("id:", id);

    if (id) {
      this.pageService.onePage(id).subscribe((data: any) => {
        this.page.set(data.data);
      });
    }
  });
}
}       