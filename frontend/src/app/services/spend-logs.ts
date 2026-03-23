import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SpendLogs {
    private baseUrl = 'api/v1/spend'

    constructor(private http: HttpClient) {}

  getDailySpendLogs(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/spend-logs`, {credentials: 'include'})
  }

  getBudgetSummary(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/analytics`, {credentials: 'include'})
  }
}