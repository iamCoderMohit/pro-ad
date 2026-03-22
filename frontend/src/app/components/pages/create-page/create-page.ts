import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pages } from '../../../services/pages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-page.html',
  styleUrl: './create-page.css',
})
export class CreatePage {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  errMsg = ''

  constructor(private pageService: Pages, private router: Router) {}

  onSubmit() {
    if(this.form.valid) {
      const val = this.form.value
      this.pageService.create(val.name!, val.category!).subscribe({
        next: () => {
          this.router.navigate(["/pages-list"])
        },
        error: (err) => {
          this.errMsg = err.error.message || "Can't create page"
        }
      })
    }
  }
} 
