import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxonomyRoutingModule } from './taxonomy-routing.module';
import { DefaultComponent } from './components/default/default.component';


@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    TaxonomyRoutingModule
  ]
})
export class TaxonomyModule { }
