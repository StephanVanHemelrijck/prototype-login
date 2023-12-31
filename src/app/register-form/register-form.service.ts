import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private apiUrl = 'https://login-backend-62m7.onrender.com';
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getUserData(uid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${uid}`);
  }
}
