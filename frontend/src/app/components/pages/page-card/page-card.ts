import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { Pages } from '../../../services/pages';
import { Loading } from '../../loading/loading';
import { ClickBtn } from '../../click-btn/click-btn';
import { Error } from "../../error/error";

@Component({
  selector: 'app-page-card',
  standalone: true,
  templateUrl: './page-card.html',
  imports: [NgIconComponent, Loading, ClickBtn, Error],
})
export class PageCard {
  @Input() name!: string;
  @Input() category!: string;
  @Input() id!: string;
  @Input() isHome!: boolean;

  constructor(
    private router: Router,
    private pageService: Pages,
  ) {}
  loading: boolean = false;
  errMsg = signal('');
  pageDetail(id: string) {
    this.router.navigate(['/pages-list', id]);
  }

  editPage(id: string) {
    this.router.navigate(['/edit-page', id]);
  }

  pageDelete(id: string) {
    this.loading = true;
    this.pageService.deletePage(id).subscribe(
      () => {
        this.router.navigate(['/pages-list']);
      },
      () => {
        this.errMsg.set("Can't delete page, try again");
        this.loading = false;

        setTimeout(() => {
          this.errMsg.set('');
        }, 3000);
      },
    );
    this.loading = false;
  }
}
