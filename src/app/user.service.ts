import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$:Observable<User[]> = this.userSubject.asObservable();


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`https://localhost:7000/api/Users`);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`https://localhost:7000/api/Users/${userId}`);

  }


  setUsers(users: User[]): void {
    this.userSubject.next(users);
  }



}

