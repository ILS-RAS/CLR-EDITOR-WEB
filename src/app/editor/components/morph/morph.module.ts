import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { MorphRoutingModule } from './morph-routing.module';
import { DefaultComponent } from './components/default/default.component';
import { MorphSelectorComponent } from './components/morph-selector/morph-selector.component';
import { MorphEditorComponent } from './components/morph-editor/morph-editor.component';


@NgModule({
  declarations: [
    DefaultComponent,
    MorphSelectorComponent,
    MorphEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MorphRoutingModule,
    PanelModule,
    TableModule
  ]
})
export class MorphModule { }
