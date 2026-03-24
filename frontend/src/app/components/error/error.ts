import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-error',
    templateUrl: "./error.html",
    styleUrl: './error.css'
})

export class Error {
    @Input() error: string | null = "Something went wrong"
}