import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static noEmpty(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && value.trim().length === 0) {
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
}
