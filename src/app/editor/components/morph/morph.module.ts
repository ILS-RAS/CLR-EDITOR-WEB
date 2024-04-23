import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorphRoutingModule } from './morph-routing.module';
import { DefaultComponent } from './components/default/default.component';


@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    MorphRoutingModule
  ]
})
export class MorphModule { }
