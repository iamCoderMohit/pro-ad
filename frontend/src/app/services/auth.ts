import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = '/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/signup`, { name, email, password });
  }

  user = signal<{ id: string; email: string; role: string } | null>(null);

loadUser(): Promise<void> {
  return new Promise((resolve) => {
    this.http.get(`${this.baseUrl}/me`, { withCredentials: true })
    .subscribe({
      next: (data: any) => {
          console.log("called")
          this.user.set(data.data);
          resolve();
        },
        error: (err) => {
          console.error("load user err", err)
          this.user.set(null);
          resolve();
        }
      });
  });
}

  isAdmin() {
    return this.user()?.role === 'admin';
  }
}
