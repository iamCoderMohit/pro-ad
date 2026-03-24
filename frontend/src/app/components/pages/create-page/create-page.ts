import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pages } from '../../../services/pages';
import { Router } from '@angular/router';
import { Loading } from "../../loading/loading";
import { single } from 'rxjs';
import { Error } from "../../error/error";

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule, Loading, Error],
  templateUrl: './create-page.html',
  styleUrl: './create-page.css',
})
export class CreatePage {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  errMsg = signal('')
  loading = signal(false)

  constructor(private pageService: Pages, private router: Router) {}

  onSubmit() {
    if(this.form.valid) {
      this.loading.set(true)
      const val = this.form.value
      this.pageService.create(val.name!, val.category!).subscribe({
        next: () => {
          this.loading.set(false)
          this.router.navigate(["/pages-list"])
        },
        error: (err) => {
          this.errMsg.set("Can't create page, try again")
          this.loading.set(false)

          setTimeout(() => {
            this.errMsg.set('')
          }, 3000);
        }
      })
    }
  }
} 
