import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  public currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap((res: any) => this.currentUser.next(res.user))
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true })
      .pipe(
        tap(() => this.currentUser.next(null))
      );
  }

  loadUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          this.currentUser.next(res.user);
        })
      );
  }
}
