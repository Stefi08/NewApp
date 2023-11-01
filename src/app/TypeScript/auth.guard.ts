// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
  import { AccountService } from '../_services/account.service';
  import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 isUserLoggedIn:boolean = false;
 loggedIn:boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (this.userIsLoggedIn()) {
      return true;
    } else {
    .
      this.router.navigate(['/home']);
      return false;
    }
  }

  private userIsLoggedIn(): boolean {
    const userJson = localStorage.getItem('user');

    return !!userJson;
  }
}
export class AppComponent {
  constructor(private toastr: ToastrService) {}

  showSuccessToast() {
    this.toastr.success('This is a success message', 'Success');
  }
}
