import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.FormBuild();
   }

  private FormBuild(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void {
    e.preventDefault();
  }

}
