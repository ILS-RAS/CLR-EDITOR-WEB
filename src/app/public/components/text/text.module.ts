import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRoutingModule } from './text-routing.module';
import { DefaultComponent } from './components/default/default.component';


@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    TextRoutingModule
  ]
})
export class TextModule { }
