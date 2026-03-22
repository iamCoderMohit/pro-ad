import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Auth } from "../../services/auth";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-signup",
    imports: [ReactiveFormsModule, NgIf, RouterLink],
    templateUrl: "./signup.html"
})

export class Signup {
    form = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.minLength(6))
    })

    errMsg = ''

    constructor(private authService: Auth, private router: Router) {}

    onSubmit() {
        if(this.form.valid) {
            const val = this.form.value
            this.authService.signup(val.name!, val.email!, val.password!).subscribe({
                next: () => {
                    this.router.navigate(["/pages-list"])
                },
                error: (err) => {
                    this.errMsg = err.error.message || "Signup failed"
                }
            })
        }
    }
}