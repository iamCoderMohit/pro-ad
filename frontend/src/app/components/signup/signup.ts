import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Auth } from "../../services/auth";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import { Loading } from "../loading/loading";

@Component({
    selector: "app-signup",
    imports: [ReactiveFormsModule, NgIf, RouterLink, Loading],
    templateUrl: "./signup.html"
})

export class Signup {
    form = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.minLength(6))
    })

    errMsg = ''
    loading = signal<boolean>(false)

    constructor(private authService: Auth, private router: Router) {}

    onSubmit() {
        if(this.form.valid) {
            this.loading.set(true)
            const val = this.form.value
            this.authService.signup(val.name!, val.email!, val.password!).subscribe({
                next: () => {
                    this.loading.set(false)
                    this.router.navigate(["/create-page"])
                },
                error: (err) => {
                    this.loading.set(false)
                    this.errMsg = err.error.message || "Signup failed"
                }
            })
        }
    }
}