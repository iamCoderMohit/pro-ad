import { Component, OnInit, signal } from '@angular/core';
import { Campaigns } from '../../../services/campaigns';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { SpendLogs } from '../../../services/spend-logs';

@Component({
  selector: 'app-campaigns-dashboard',
  imports: [NgIf],
  standalone: true,
  templateUrl: './campaigns-dashboard.html',
  styleUrl: './campaigns-dashboard.css',
})
export class CampaignsDashboard implements OnInit {
  constructor(
    private campaignService: Campaigns,
    private spendLogsService: SpendLogs,
    private route: ActivatedRoute,
  ) {}

  camp = signal<any>([]);
  currentId: string | null = null
  spendLogs = signal<any>([])
  budgetSummary = signal<any>([])

  ngOnInit() {
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
  statusChange() {
    this.campaignService.changeStatus(this.currentId as string).subscribe({})
  }

  getSpendLogs(id: string) {

  }
}
