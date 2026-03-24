import { Component, OnInit, signal } from '@angular/core';
import { Campaigns } from '../../../services/campaigns';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { SpendLogs } from '../../../services/spend-logs';
import { NgIcon, NgIconComponent } from "@ng-icons/core";
import { Loading } from "../../loading/loading";

@Component({
  selector: 'app-campaigns-dashboard',
  imports: [NgIf, NgIcon, NgIconComponent, NgClass, Loading],
  standalone: true,
  templateUrl: './campaigns-dashboard.html',
  styleUrl: './campaigns-dashboard.css',
})
export class CampaignsDashboard implements OnInit {
  constructor(
    private campaignService: Campaigns,
    private spendLogsService: SpendLogs,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  camp = signal<any>([]);
  currentId: string | null = null
  spendLogs = signal<any>([])
  budgetSummary = signal<any>([])
  pageId: string | null = null
  loading = signal<boolean>(false)

  ngOnInit() {
    this.pageId = history.state.pageId
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.currentId = id
        this.campaignService.oneCamp(id).subscribe((data: any) => {
          this.camp.set(data.data);
        });

        this.spendLogsService.getDailySpendLogs(id).subscribe((data: any) => {
          this.spendLogs.set(data.data)
        }) 

        this.spendLogsService.getBudgetSummary(id).subscribe((data: any) => {
          this.budgetSummary.set(data.data)
        })
      }
    });

  }
  statusChange(id: string) {
    this.loading.set(true)
    this.campaignService.changeStatus(this.currentId as string).subscribe({})
    this.router.navigate(['/campaign', id])
    this.loading.set(false)
  }

  editPage(id: string) {
    this.router.navigate(['/edit-campaign', id])
  }

  deleteCamp(id: string) {
    this.campaignService.deleteCamp(id).subscribe({})
    this.router.navigate(['/pages-list', this.pageId])
  }

  formatDate(date: string) {
    return new Date(date).toLocaleTimeString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

