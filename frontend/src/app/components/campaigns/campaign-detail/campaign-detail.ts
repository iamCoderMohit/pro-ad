import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-detail',
  imports: [],
  standalone: true,
  templateUrl: './campaign-detail.html',
  styleUrl: './campaign-detail.css',
})
export class CampaignDetail {
  @Input() id!: string
  @Input() name!: string
  @Input() type!: string
  @Input() amount!: number
  @Input() spent!: number
  @Input() remaining!: number
  @Input() pageId!: string

  constructor(private router: Router) {}

  dashboard(id: string, pageId: string) {
    this.router.navigate(["/campaign", id], {state: {pageId}})
  }
}
