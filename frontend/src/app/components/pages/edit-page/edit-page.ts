import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from '../../../services/pages';
import { Loading } from "../../loading/loading";
import { Error } from "../../error/error";

@Component({
  templateUrl: './edit-page.html',
  imports: [ReactiveFormsModule, Loading, Error],
})
export class EditPage {
  page = signal<any>([]);
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private pageService: Pages,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  currentId: string | null = null;
  loading: boolean = false
  errMsg = signal('')
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.currentId = id;
        this.pageService.onePage(id).subscribe(
          (data: any) => {
          this.page.set(data.data);

          this.form.patchValue({
            name: data.data.name,
            category: data.data.category
          })
        },
        () => {
          this.errMsg.set("Can't get page info")
          this.loading = false 

          setTimeout(() => {
            this.errMsg.set('')
          }, 3000);
        }
      );
      }
    });
  }

  onSubmit() {
    this.loading = true
    if (this.form.valid) {
      const val = this.form.value;
      this.pageService.editPage(this.currentId as string, val.name!, val.category!).subscribe({
        next: () => {
          this.loading = false
          this.router.navigate(['/pages-list', this.currentId]);
        },
        error: () => {
          this.errMsg.set("Can't update page")
          this.loading = false

          setTimeout(() => {
            this.errMsg.set('')
          }, 3000);
        }
      });
    }
  }
}
