import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  matchPasswordValidator,
  samePasswordValidator,
} from '../auth/Validators/custom-validator';
import { ChangepasswordService } from '../service/changepassword.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChangepasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private changePasswodService: ChangepasswordService,
  ) {}

  ngOnInit(): void {}
  hidePass = false;
  hideConPass = false;
  regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,10}$/;

  changePassword = this.fb.group(
    {
      currentPassword: [
        '',
        [Validators.required, Validators.pattern(this.regex)],
      ],
      newPassword: ['', [Validators.required, Validators.pattern(this.regex)]],
      confirmNewPassword: ['', Validators.required],
    },
    { validators: [matchPasswordValidator(), samePasswordValidator()] },
  );

  get currentPassword() {
    return this.changePassword.get('currentPassword');
  }

  get newPassword() {
    return this.changePassword.get('newPassword');
  }
  get confirmNewPassword() {
    return this.changePassword.get('confirmNewPassword');
  }

  onSubmit() {
    const { newPassword, currentPassword } = this.changePassword.value;

    this.changePasswodService
      .changePassword(newPassword as string, currentPassword as string)
      .pipe(
        tap({
          error: (err) => {
            console.log(err);
            // this.router.navigate(['auth/signin']);
          },
        }),
      )
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          if (res.statusCode == 200) {
            this.router.navigate(['auth/signin']);
          }
        },
      });
  }

  clickEventPass() {
    this.hidePass = !this.hidePass;
  }
  clickEventConPass() {
    this.hideConPass = !this.hideConPass;
  }
}
