import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaxonomyRoutingModule } from './taxonomy-routing.module';
import { DefaultComponent } from './components/default/default.component';
import { TaxonomyItemsComponent } from './components/taxonomy-items/taxonomy-items.component';
import { TaxonomyIndexComponent } from './components/taxonomy-index/taxonomy-index.component';
import { TaxonomyToolbarComponent } from './components/taxonomy-toolbar/taxonomy-toolbar.component';

import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  declarations: [
    DefaultComponent,
    TaxonomyItemsComponent,
    TaxonomyIndexComponent,
    TaxonomyToolbarComponent
  ],
  imports: [
    CommonModule,
    TaxonomyRoutingModule,
    ListboxModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    ScrollPanelModule,
    SplitterModule,
  ]
})
export class TaxonomyModule { }
