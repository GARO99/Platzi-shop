import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../core/services/products/products.service';
import Swal from 'sweetalert2';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { CustomValidators } from '../../../util/custom-validators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  @Input() id: string | null;
  @Input() dialogRef: MatDialogRef<DialogFormComponent>;

  productForm: FormGroup;
  statusBtnSubmit: boolean;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
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
          CustomValidators.noEmpty
        ]
      ],
      price: [
        null,
        [
          Validators.required,
          CustomValidators.validPrice
        ]
      ],
      image: [
        null
      ],
      description: [
        null,
        [
          Validators.required,
          CustomValidators.noEmpty
        ]
      ]
    });
  }

  ngOnInit(): void{
    this.statusBtnSubmit = false;
    if (this.id !== null) {
      this.bringDataToEdit();
    }
  }

  bringDataToEdit(): void {
    this.productsService.getProduct(this.id).subscribe(
      r => {
        this.productForm.patchValue(r);
      }
    );
  }

  closeDialog(updateTable: boolean): void {
    this.dialogRef.close(updateTable);
  }

  private resetForm(): void {
    this.buildForm();
    this.formDirective.resetForm();
  }

  successMsg(): void {
    Swal.fire({
      title: `El producto fue ${this.id === null ? 'registrado' : 'actualizado'} con éxito`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Cerrar formulario',
      cancelButtonText: 'Crear otro producto',
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary mr-1',
        cancelButton: 'mat-focus-indicator mat-raised-button mat-button-base'
      },
      buttonsStyling: false,
      allowOutsideClick: false
    }).then((r) => {
      if (r.value) {
        this.closeDialog(true);
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

  createProduct(): void {
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

  updateProduct(): void {
    this.productsService.updateProduct(this.id, this.productForm.value).subscribe(
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

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.productForm.valid) {
      this.statusBtnSubmit = true;

      if (this.id === null) {
        this.createProduct();
      }else{
        this.updateProduct();
      }
    }
  }
}
