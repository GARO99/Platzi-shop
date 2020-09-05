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
      email: [null, [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void {
    e.preventDefault();
  }

}
