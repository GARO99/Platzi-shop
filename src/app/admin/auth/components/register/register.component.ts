import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/util/custom-validators';
import { CustomErrorStateMatcher } from 'src/app/util/custom-errorStateMatcher';
import { ControlFirebaseError } from 'src/app/util/control-firebaseError';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  signUpForm: FormGroup;
  matcher = new CustomErrorStateMatcher();
  controlFirebaseError = new ControlFirebaseError();

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.FormBuild();
   }

  ngOnInit(): void {
  }

  private FormBuild(): void{
    this.signUpForm = this.fb.group({
      fullName: [null, [Validators.required, CustomValidators.noEmpty]],
      email: [null, [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
      confirmPassword: [null, [Validators.required]]
    }, {validators: CustomValidators.PasswordsNotSame});
  }
  errorMsg(message: string): void {
    Swal.fire({
      title: '¡A ocurriedo un error!',
      icon: 'error',
      text: message,
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary mr-1',
      },
      buttonsStyling: false,
      allowOutsideClick: false
    });
  }
  onSubmit(e: Event): void{
    e.preventDefault();
    if (this.signUpForm.valid){
      this.authService.createUser(this.signUpForm.value.email, this.signUpForm.value.password).then(r => {
        this.route.navigate(['/admin/auth']);
      }).catch(err => {
        console.log(err);
        this.errorMsg(this.controlFirebaseError.getErrorMessage(err.code));
      });
    }
  }
}
