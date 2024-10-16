import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7203/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
