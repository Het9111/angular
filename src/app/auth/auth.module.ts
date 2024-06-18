import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'resetpassword',
    component: LoginComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'resetPassword/:token',
    component: ResetpasswordComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
