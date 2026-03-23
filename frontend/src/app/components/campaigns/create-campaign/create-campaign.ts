import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Campaigns } from '../../../services/campaigns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  imports: [ReactiveFormsModule],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    objective: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required)
  })

  constructor(private campaignService: Campaigns, private router: Router) {}
  data: string | null = null

  ngOnInit() {
    const data = history.state.id
    this.data = data
  }
  onSubmit() {
    if(this.form.valid) {   
      const val= this.form.value

      this.campaignService.create(this.data as string, val.name!, val.objective!, val.type!, val.amount!, val.end_date!).subscribe({
        next: () => {
          this.router.navigate(['/pages-list', this.data])
        }
      })
    }
  }
}
