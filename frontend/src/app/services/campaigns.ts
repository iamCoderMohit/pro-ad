import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Campaigns {
  private baseUrl = '/api/v1/campaign'

  constructor(private http: HttpClient) {}

  create(page_id: string, name: string, objective: string, budget_type: string, budget_amount: string, end_date: string) {
    return this.http.post(`${this.baseUrl}/create`, {page_id, name, objective, budget_amount, budget_type, end_date}, {credentials: 'include'})
  }
  pageCamp(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, {credentials: 'include'})
  }

  oneCamp(id: string) {
    return this.http.get(`${this.baseUrl}/find/${id}`, {credentials: 'include'})
  }

  changeStatus(id: string) {
    return this.http.patch(`${this.baseUrl}/${id}/status`, {status: "active"}, {credentials: 'include'})
  }

  editCamp(id: string, name: string, objective: string, budget_amount: number, budget_type: string, end_date: string) {
    return this.http.put(`${this.baseUrl}/${id}`, { name, objective, budget_amount, budget_type, end_date }, {credentials: 'include'})
  }

  deleteCamp(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {withCredentials: true})
  }
}
