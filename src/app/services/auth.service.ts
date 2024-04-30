import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(userDetail: IUser) {
    return this.http.post(`${this.baseUrl}/users`, userDetail);
  }

  getUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users?email=${email}`);
  }
}
