import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Pages {
  private baseUrl = '/api/v1/page'

  constructor(private http: HttpClient) {}

  create(name: string, category: string) {
    return this.http.post(`${this.baseUrl}/create`, {name, category}, {withCredentials: true})
  }

  myPages() {
    return this.http.get(`${this.baseUrl}/my`, {withCredentials: true})
  }

  onePage(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, {withCredentials: true})
  }

  editPage(id: string, name: string, category: string) {
    return this.http.put(`${this.baseUrl}/${id}`, {name, category}, {credentials: 'include'})
  }

  deletePage(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {credentials: 'include'})
  }
}
