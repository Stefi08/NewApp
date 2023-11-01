import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  registerModel:any = {
    username: '',
    password: ''
  };


  constructor(public accountService: AccountService,private toastr:ToastrService) {}

  register() {
    if (!this.registerModel.username || !this.registerModel.password) {
      this.toastr.error('Please enter both username and password.', 'Error');
  
    }
    this.accountService.register(this.registerModel).subscribe(
      (response: any) => {

        console.log('Registration error:', response);
      },
      (error) => {

        this.toastr.error('Registration error:', 'User exist');
      }
    );


    }}
