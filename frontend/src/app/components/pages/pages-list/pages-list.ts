import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from '../../../services/pages';
import { NgFor, NgIf } from '@angular/common';
import { PageCard } from '../page-card/page-card';

@Component({
  selector: 'app-pages-list',
  imports: [NgFor, NgIf, PageCard],
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

  ngOnInit() {
    this.pageService.myPages().subscribe((data: any) => {
      this.pages.set(data.data);
    });
  }

  newPage() {
    this.router.navigate(['/create-page']);
  }

}
