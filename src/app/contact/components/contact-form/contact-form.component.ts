import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.contactForm.valid){
      alert('Thanks!');
    }
  }

  private buildForm(): void {
    this.contactForm = this.fb.group({
      firstName: [
        null,
        Validators.required
      ],
      lastName: [
        null,
        Validators.required
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){7}(([\d][\s|\-|\.]?){3}(([\d][\s|\-|\.]?){2})?)?)$/)
        ]
      ],
      message: [
        null,
        Validators.required
      ]
    });
  }
}
