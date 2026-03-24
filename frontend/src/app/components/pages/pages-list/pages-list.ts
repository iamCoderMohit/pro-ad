import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../../services/pages';
import { NgFor, NgIf } from '@angular/common';
import { PageCard } from '../page-card/page-card';
import { Loading } from "../../loading/loading";

@Component({
  selector: 'app-pages-list',
  imports: [NgFor, NgIf, PageCard, Loading],
  templateUrl: './pages-list.html',
  styleUrl: './pages-list.css',
  standalone: true,
})
export class PagesList implements OnInit {
  constructor(
    public router: Router,
    private pageService: Pages,
  ) {}

  pages = signal<any>([]);
  loading = signal<boolean>(false)

  ngOnInit() {
    this.loading.set(true)
    this.pageService.myPages().subscribe((data: any) => {
      this.pages.set(data.data);
      this.loading.set(false)
    });
  }

  newPage() {
    this.router.navigate(['/create-page']);
  }

}
