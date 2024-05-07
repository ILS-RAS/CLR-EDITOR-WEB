import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaxonomyRoutingModule } from './taxonomy-routing.module';
import { DefaultComponent } from './components/default/default.component';
import { TaxonomyItemsComponent } from './components/taxonomy-items/taxonomy-items.component';
import { TaxonomyIndexComponent } from './components/taxonomy-index/taxonomy-index.component';

import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    DefaultComponent,
    TaxonomyItemsComponent,
    TaxonomyIndexComponent
  ],
  imports: [
    CommonModule,
    TaxonomyRoutingModule,
    ListboxModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule
  ]
})
export class TaxonomyModule { }
