import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '@core/services/products/products.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { CustomValidators } from '@util/custom-validators';

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
  loadImage: boolean;
  imgUrl$: Observable<any>;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private angularFireStorage: AngularFireStorage
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
    this.loadImage = false;
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
      err => {
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
      err => {
        this.errorMsg();
      },
      () => {
        this.statusBtnSubmit = false;
      }
    );
  }

  async uploadImg(e: Event): Promise<void> {
    this.statusBtnSubmit = true;
    this.loadImage = true;
    const file = (e.target as HTMLInputElement).files[0];
    const imgLaction = `products/${file.name}`;
    const fileRef =  this.angularFireStorage.ref(imgLaction);
    if (await this.imgExist(fileRef).toPromise()){
      this.loadImg(fileRef);
    }else {
      const task = this.angularFireStorage.upload(imgLaction, file);
      task.snapshotChanges().pipe(
       finalize(() => {
        this.loadImg(fileRef);
        })
      ).subscribe();
    }
  }

  imgExist(fileRef: AngularFireStorageReference): Observable<boolean> {
    return fileRef.getDownloadURL().pipe(
      map(() => true),
      catchError(async () => false)
    );
  }

  loadImg(fileRef: AngularFireStorageReference): void{
    this.imgUrl$ = fileRef.getDownloadURL();
    this.imgUrl$.subscribe(url => {
      this.productForm.get('image').setValue(url);
      this.statusBtnSubmit = false;
      this.loadImage = false;
    });
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
