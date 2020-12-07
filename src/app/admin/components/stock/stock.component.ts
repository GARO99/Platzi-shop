import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StockDataSource } from './stock-datasource';
import { Product } from '../../../products/interfaces/product.model';
import { ProductsService } from '@core/services/products/products.service';
import Swal from 'sweetalert2';

import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: StockDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'price', 'action'];

  idInterval: number;

 constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe
  ){}

  ngOnInit(): void {
    this.dataSource = new StockDataSource();
    this.fetchPorducts();

    this.idInterval = setInterval(() => {
      this.updateTable();
    }, 1800000);
  }

  fetchPorducts(): void {
    this.productsService.getAllProducts().subscribe( r => {
      this.dataSource.data = r;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  updateTable(): void {
    this.fetchPorducts();
  }

  successDeleteMsg(): void {
    Swal.fire({
      title: 'El producto fue borrado con exito',
      icon: 'success',
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary'
      },
      buttonsStyling: false,
      allowOutsideClick: false
    });
  }

  errorMsg(): void {
    Swal.fire({
      title: '¡A ocurriedo un error!',
      icon: 'error',
      text: 'Por favor, vuelve a intentarlo',
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary'
      },
      buttonsStyling: false,
      allowOutsideClick: false
    });
  }

  cancelMsg(): void {
    Swal.fire({
      title: 'Se a cancelado la acción',
      icon: 'info',
      text: 'No se realizo ningun cambio',
      customClass: {
        confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary'
      },
      buttonsStyling: false,
      allowOutsideClick: false
    });
  }

  viewProduct(id: string): void {
    this.productsService.getProduct(id).subscribe(
      r => {
        Swal.fire({
          title: `Producto: ${r.title}`,
          imageUrl: r.image,
          imageWidth: 300,
          imageAlt: `img-${r.title}`,
          html: `
                <p><b>Id: </b>${r.id}</p>
                <p><b>Precio: </b>${this.currencyPipe.transform(r.price)}</p>
                <p><b>descripción: </b>${r.description}</p>
              `,
          customClass: {
            confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary'
          },
          buttonsStyling: false
        });
      },
      error => {
        this.errorMsg();
      }
    );
  }

  openDialogForm(id: string | null): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '800px',
      data: id
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        this.updateTable();
      }
    });
  }

  confirmDeleteProduct(id: string): void {
    this.productsService.getProduct(id).subscribe(
      r => {
        Swal.fire({
          title: '¿ Seguro que quieres borrar este producto ?',
          icon: 'warning',
          html: `
                <p><b>Id: </b>${r.id}</p>
                <p><b>Titulo: </b>${r.title}</p>
                <p><b>descripción: </b>${r.description}</p>
              `,
          showCancelButton: true,
          confirmButtonText: 'Borrar',
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-primary',
            cancelButton: 'mat-focus-indicator mat-raised-button mat-button-base mat-warn mr-1'
          },
          buttonsStyling: false,
          reverseButtons: true,
          allowOutsideClick: false
        }).then((rs) => {
          if (rs.value) {
            this.deleteProduct(id);
          } else {
           this.cancelMsg();
          }
        });
      },
      error => {
        this.errorMsg();
      }
    );
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe(
      r => {
        this.successDeleteMsg();
        this.updateTable();
      },
      error => {
        this.errorMsg();
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    if (this.idInterval){
      clearInterval(this.idInterval);
    }
  }
}
