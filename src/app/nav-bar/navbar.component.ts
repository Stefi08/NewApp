
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  exportAs: 'loginForm',



})

 export class NavBarComponent {
  loggedInUser: string;
  //@ViewChild('loginForm') form: any;
  //ToastrService: ToastrService;
  //showSuccessToast;
 // user$: Observable<User>;
  //loginForm: FormGroup;
  loginForm:any={
      username: '',
      password:'',

  };


  loggedIn: boolean = false;
  //users: User[]=[];
  //status: string;
  //currentUser : any|null=null;

  constructor(  private toastr: ToastrService,public accountService:AccountService,private router:Router) { }

  ngOnInit(): void {


    //  this.accountService.currentUser$.subscribe((user:any | null) =>{
    //   this.currentUser = user;
    //   this.loggedIn = !!user;

    //   if (this.loggedIn) {
    //     this.loggedInUser = user.username; // Зачувај го името на пријавениот корисник
    //   }

    //  });
  }
  login(loginForm) {
    const username = loginForm.username;
    const password = loginForm.password;
    if (!username || !password) {
      this.toastr.error('Please enter both username and password.', 'Error');
      return;
    }

    this.accountService.login(username, password).subscribe(

      (user) => {
    //     //if (user && user.token) {
    //       //Ako je prijava uspešna, postavite loggedIn na true i preusmerite na /member-list
    //       this.loggedIn = true;
    //       this.loggedInUser = user.username;
          this.router.navigate(['/member-list']);
    //     } else {
    //        this.toastr.error('Wrong password', 'Login Error');
    //      }
    //   },
      },
      (error) => {
        this.toastr.error('An error occurred', 'Login Error');
      }
    );
    }

      logout(){
        this.accountService.logout();
        this.loggedIn=false;

       this.router.navigate(['/']);
      }

  }




