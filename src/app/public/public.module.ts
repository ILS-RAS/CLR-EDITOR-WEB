import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/components/default.component';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './default/components/header/header.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
