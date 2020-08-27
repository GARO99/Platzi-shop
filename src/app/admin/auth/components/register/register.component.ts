import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/util/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.FormBuild();
   }

  ngOnInit(): void {
  }

  private FormBuild(): void{
    this.signUpForm = this.fb.group({
      fullName: [null, [Validators.required, CustomValidators.noEmpty]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  onSubmit(e: Event): void{
    e.preventDefault();
  }
}
