import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlFirebaseError } from '@util/control-firebaseError';

import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  signInForm: FormGroup;
  controlFirebaseError = new ControlFirebaseError();

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.FormBuild();
   }

  private FormBuild(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]]
    });
  }

  ngOnInit(): void {
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

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.signInForm.valid) {
      this.authService.singIn(this.signInForm.value.email, this.signInForm.value.password).then( r => {
        this.route.navigate(['/admin']);
      }).catch( err => {
        console.log(err);
        this.errorMsg(this.controlFirebaseError.getErrorMessage(err.code));
      });
    }
  }

}
