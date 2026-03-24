import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf} from '@angular/common'
import {Auth} from "../../services/auth"
import { Router, RouterLink } from '@angular/router';
import { Loading } from "../loading/loading";
import { Error } from "../error/error";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink, Loading, Error],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(6))
  })

  errMsg = signal('')
  loading = signal(false)

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    if(this.form.valid) {
      this.loading.set(true)
      const val = this.form.value
      this.authService.login(val.email!, val.password!).subscribe({
        next: (res) => {
          this.loading.set(false)
          this.router.navigate(["/create-page"])
        },
        error: (err) => {
          this.errMsg.set('Login failed, try again')
          this.loading.set(false)

          setTimeout(() => {
            this.errMsg.set('')
          }, 3000);
        }
      })
    }
  }
}
