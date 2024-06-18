import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let newPassword = control.get('newPassword')?.value;
    let confirmNewPassword = control.get('confirmNewPassword')?.value;
    if (newPassword !== confirmNewPassword) {
      return { matchPassword: true };
    }
    return null;
  };
}

export function samePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let newPassword = control.get('newPassword')?.value;
    let currentPassword = control.get('currentPassword')?.value;
    if (newPassword === currentPassword) {
      return { samePassword: true };
    }
    return null;
  };
}
