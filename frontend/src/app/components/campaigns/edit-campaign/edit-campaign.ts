import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaigns } from '../../../services/campaigns';
import { Loading } from "../../loading/loading";

@Component({
  templateUrl: './edit-campaign.html',
  imports: [ReactiveFormsModule, Loading],
})
export class EditCampaign {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    objective: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    end_date: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: Campaigns,
  ) {}

  camp = signal<any>([]);
  currentId: string | null = null
  loading = false

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.currentId = id
        this.campaignService.oneCamp(id).subscribe((data: any) => {
          this.camp.set(data.data);

          this.form.patchValue({
            name: data.data.name,
            objective: data.data.objective,
            type: data.data.budget_type,
            amount: data.data.budget_amount,
            end_date: data.data.end_date,
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true
      const val = this.form.value;

      this.campaignService
        .editCamp(
          this.currentId as string,
          val.name!,
          val.objective!,
          val.amount!,
          val.type!,
          val.end_date!,
        )
        .subscribe({
          next: () => {
            this.loading = false
            this.router.navigate(['/campaign', this.currentId]);
          },
        });
    }
  }
}
