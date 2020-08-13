import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm(): void {
    this.productForm = this.fb.group({
      id: [
        null,
        [
          Validators.required,
          Validators.pattern(/^([0-9])+/)
        ]
      ],
      title: [
        null,
        [
          Validators.required
        ]
      ],
      price: [
        null,
        [
          Validators.required
        ]
      ],
      image: [
        null,
        [
          Validators.required
        ]
      ],
      description: [
        null,
        [
          Validators.required
        ]
      ]
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.productForm.valid) {
      alert('Thanks!');
    }
  }
}
