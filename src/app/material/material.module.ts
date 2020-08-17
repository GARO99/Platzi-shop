import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

import { CustomPaginator } from './custom-files/CustomPaginatorConfiguration';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl, useClass: CustomPaginator
    }
  ]
})
export class MaterialModule { }
