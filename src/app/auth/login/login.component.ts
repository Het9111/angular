import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs';
import { StorageService } from 'src/app/service/storage-service.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [AuthService],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) {}

  hide = false;
  regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,10}$/;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.regex)]],
  });

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    try {
      const { password = '', email = '' } = this.loginForm.value;
      this.authservice
        .login({
          email,
          password,
          role: 'admin',
          deviceId: 'admin',
          fcmToken: 'admin',
        })
        .pipe(
          tap({
            error: (err) => {
              console.log(err);
            },
          }),
        )
        .subscribe({
          next: (res: any) => {
            this.storageService.setData('accessToken', res.data.accessToken);
            this.storageService.setData('userData', res.data);
            this.router.navigate(['dashboard']);
          },
        });
    } catch (err) {
      console.log('try catch error', err);
    }
  }

  resetForm() {
    this.loginForm.reset();
  }

  fillForm() {
    this.loginForm.setValue({
      email: 'hetpatelg9111@gmail.com',
      password: 'Het@9111',
    });
  }

  clickEvent() {
    this.hide = !this.hide;
  }
  fillData() {
    this.loginForm.setValue({
      email: 'admin.numberdekho@yopmail.com',
      password: 'Admin@123',
    });
  }
}
