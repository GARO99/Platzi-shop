import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StockDataSource } from './stock-datasource';
import { Product } from '../../../products/interfaces/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

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
    private productsService: ProductsService
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
