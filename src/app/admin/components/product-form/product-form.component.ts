import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';

import Swal from 'sweetalert2';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  productForm: FormGroup;
  statusBtnSubmit: boolean;

  constructor(private productsService: ProductsService, private fb: FormBuilder, private router: Router) {
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
          Validators.required,
        ]
      ],
      price: [
        null,
        [
          Validators.required,
        ]
      ],
      image: [
        null
      ],
      description: [
        null,
        [
          Validators.required,
        ]
      ]
    });
  }

  ngOnInit(): void{
    this.statusBtnSubmit = false;
  }

  private resetForm(): void {
    this.buildForm();
    this.formDirective.resetForm();
  }

  successMsg(): void {
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

  errorMsg(): void {
    Swal.fire({
      title: '¡A ocurriedo un error!',
      icon: 'error',
      text: 'Por favor, vuelve a intentarlo',
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary mr-1',
      },
      buttonsStyling: false,
      allowOutsideClick: false
    });
  }

  onkey(e: Event): void {
    e.preventDefault();
    console.log(e);
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.productForm.valid) {
      this.statusBtnSubmit = true;
      this.productsService.createProduct(this.productForm.value).subscribe(
        r => {
          this.successMsg();
        },
        error => {
          this.errorMsg();
        },
        () => {
          this.statusBtnSubmit = false;
        }
      );
    }
  }
}
