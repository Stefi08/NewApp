import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'https://localhost:7000/api/Account';
  //private isLoggedInSubject = new BehaviorSubject<boolean>(false);



  private readonly userStorageKey = 'user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable()


  constructor(private http: HttpClient, private router: Router) {
    //const storedUser = JSON.parse(localStorage.getItem(this.userStorageKey) || 'null');
   // this.currentUser$ = this.currentUserSubject.asObservable();
    //this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
  }

  // get currentUserValue(): User | null {
  //   return this.currentUserSubject.value;
  // }

  login(username: string, password: string): Observable<User> {
    const loginData = { username, password };

    return this.http.post<User>(`${this.baseUrl}/login`, loginData).pipe(
      map((user: User) => {
        if (user && user.token) {
          localStorage.setItem(this.userStorageKey, JSON.stringify(user));
          //this.isLoggedInSubject.next(true);
          this.currentUserSubject.next(user);
          return user;
        }
        return user;
      })
    );
  }

  logout() {
   // this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.userStorageKey);
    this.router.navigate(['/login']); // Navigacija na stranicu za prijavu nakon odjave.
  }
  // checkIsUserLoggedIn(): Observable<boolean> {
  //   return this.isLoggedInSubject.asObservable();
  // }

  getUser():any{
    const userJson = localStorage.getItem(this.userStorageKey);
    return userJson ? JSON.parse(userJson):null;
 }

 setUser(user:User){
  this.currentUserSubject.next(user)
 }

 register(registerModel: any) {
   return this.http.post<any>(`${this.baseUrl}/register`, registerModel).pipe(
    map((user: User) => {

        localStorage.setItem(this.userStorageKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/member-list']);
        return user;

    })
  );
}

 }
