import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  private apiUrl = 'https://login-backend-62m7.onrender.com';
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUserData(uid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${uid}`);
  }
}
