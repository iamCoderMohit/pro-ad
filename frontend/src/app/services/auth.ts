import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = '/api/v1/auth'

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, {email, password})
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/signup`, {name, email, password})
  }
}
