import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.forgetPasswordForm.get('email');
  }

  onSubmit() {
    const { email } = this.forgetPasswordForm.value;
    this.authService
      .forgotpassword(email || '')
      .pipe(
        tap({
          error: (err) => {
            console.log(err);
          },
        }),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          // show notification
        },
      });
  }
}
