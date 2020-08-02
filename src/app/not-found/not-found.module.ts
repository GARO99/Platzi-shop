import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found.component';
import { NotFoundRoutingComponent } from './not-found-routing.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingComponent
  ]
})
export class NotFoundModule { }
