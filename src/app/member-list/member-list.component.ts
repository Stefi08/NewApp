import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
 public user$: Observable<User>;
 users: any;

  constructor(public userService:UserService,private accountService:AccountService,private router:Router) {

  }

  ngOnInit() {
    this.user$ = this.accountService.currentUser$;
    this.userService.getUsers();
    this.userService.getUsers().subscribe((data: User[])=>{
      this.users = data;
      console.log("Users:", data);

    });

  }
  login(){

  }
  logout(){
    localStorage.removeItem('user');
  }

}
