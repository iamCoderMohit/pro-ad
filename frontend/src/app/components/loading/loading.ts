import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.html'
})

export class Loading {
    @Input() isBlack: boolean = false
}