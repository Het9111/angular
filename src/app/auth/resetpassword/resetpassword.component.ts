import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { matchPasswordValidator } from '../Validators/custom-validator';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ResetpasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}
  regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,10}$/;

  resetPassword = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.pattern(this.regex)]],
      confirmNewPassword: ['', Validators.required],
    },
    { validators: matchPasswordValidator() },
  );

  get newPassword() {
    return this.resetPassword.get('newPassword');
  }
  get confirmNewPassword() {
    return this.resetPassword.get('confirmNewPassword');
  }
  onSubmit() {
    const { newPassword } = this.resetPassword.value;
    const token = this.route.snapshot.paramMap.get('token');

    this.authService
      .resetPassword(newPassword as string, token as string)
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
        },
      });
  }
}
