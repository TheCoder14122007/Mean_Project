import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${environment.apiUrl}/auth/login`, body);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signup(name: string, email: string, password: string) {
    const body = { name, email, password };
    return this.http.post(`${environment.apiUrl}/auth/signup`, body);
  }
}

