import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent {
  @ViewChild('formDirective') private formDirective: NgForm;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
        null
      ],
      description: [
        null,
        [
          Validators.required
        ]
      ]
    });
  }

  private resetForm(): void {
    this.buildForm();
    this.formDirective.resetForm();
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.productForm.valid) {
      Swal.fire({
        title: 'El producto fue registrado con exito',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ir al inventario',
        cancelButtonText: 'Crear otro producto',
        customClass: {
          confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary mr-1',
          cancelButton: 'mat-focus-indicator mat-raised-button mat-button-base'
        },
        buttonsStyling: false,
        allowOutsideClick: false
      }).then((r) => {
        if (r.value) {
          this.router.navigate(['./admin/stock']);
        } else {
          this.resetForm();
        }
      });
    }
  }
}
