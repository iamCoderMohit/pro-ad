import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgIf} from '@angular/common'
import {Auth} from "../../services/auth"
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.minLength(6))
  })

  errMsg = ''

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    if(this.form.valid) {
      const val = this.form.value
      this.authService.login(val.email!, val.password!).subscribe({
        next: (res) => {
          this.router.navigate(["/create-page"])
        },
        error: (err) => {
          this.errMsg = err.error.message || 'Login failed'
        }
      })
    }
  }
}
