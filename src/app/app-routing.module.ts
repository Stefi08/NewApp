import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { HomeComponent } from './home/home.component';
//import { AccountService } from './_services/account.service';
//import { AuthGuard } from './TypeScript/auth.guard';
import{ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AuthGuard } from './TypeScript/auth.guard';
const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent,pathMatch:'full'},
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'member-list', component: MemberListComponent , canActivate:[AuthGuard]},
  { path: 'member-details/:id',component: MemberDetailsComponent,canActivate:[AuthGuard]},
  { path:'**',component:HomeComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]


})
export class AppRoutingModule { }

