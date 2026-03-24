import { Component, Inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pages } from '../../../services/pages';
import { PageCard } from '../page-card/page-card';
import { Campaigns } from '../../../services/campaigns';
import { CampaignDetail } from '../../campaigns/campaign-detail/campaign-detail';
import { NgFor, NgIf } from '@angular/common';
import { Loading } from '../../loading/loading';
import { Error } from "../../error/error";

@Component({
  selector: 'app-page-details',
  standalone: true,
  imports: [RouterModule, PageCard, NgFor, CampaignDetail, NgIf, Loading, Error],
  templateUrl: './page-detail.html',
})
export class PageDetail implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pageService: Pages,
    private campaignService: Campaigns,
    private router: Router,
  ) {}

  page = signal<any>([]);
  currentId: string | null = null;
  camp = signal<any>([]);
  loading = signal<boolean>(false);
  errMsg = signal('');

  ngOnInit() {
    this.loading.set(true);
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.currentId = id;
        this.pageService.onePage(id).subscribe(
          (data: any) => {
            this.page.set(data.data);
          },
          () => {
            this.errMsg.set("Can't get page details");
            this.loading.set(false);

            setTimeout(() => {
              this.errMsg.set('');
            }, 3000);
          },
        );

        this.campaignService.pageCamp(id).subscribe(
          (data: any) => {
            this.camp.set(data.data);
            this.loading.set(false);
          },
          () => {
            this.errMsg.set("Can't get campaign details");
            this.loading.set(false);

            setTimeout(() => {
              this.errMsg.set('');
            }, 3000);
          },
        );
      }
    });
  }

  createCampaign() {
    this.router.navigate(['/create-campaign'], { state: { id: this.currentId } });
  }
}
