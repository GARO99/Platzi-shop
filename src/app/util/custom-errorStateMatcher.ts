import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && (control.dirty || control.touched || form.submitted));
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.hasError('passwordsNotSame')
                             && (control.parent.dirty || control.parent.touched || form.submitted));

    return (invalidCtrl || invalidParent);
  }
}
