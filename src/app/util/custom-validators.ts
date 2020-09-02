import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {

  static noEmpty(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && value.length > 0 && value.trim().length === 0) {
      return { noEmpty : true };
    }

    return null;
  }

  static validPrice(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && value <= 0) {
      return { validPrice : true };
    }

    return null;
  }

  static PasswordsNotSame(group: FormGroup): ValidationErrors | null {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    if (confirmPass === null || confirmPass.length === 0) {
      return null;
    }

    return pass === confirmPass ? null : { passwordsNotSame: true };
  }
}
