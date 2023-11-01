import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(public toastr: ToastrService,private router:Router) { }
    updateProfile(){
      this.toastr.success('Profile updated successfully');
    }
  ngOnInit(): void {
  }

  clickEdit(){
    this.router.navigate(['edit-profile']);
  }
}
