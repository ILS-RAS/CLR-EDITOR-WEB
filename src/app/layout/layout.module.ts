import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';
import { MenuitemComponent } from './menuitem.component';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { ConfigModule } from './config/config.module';
@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    MenuComponent,
    MenuitemComponent,
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    ConfigModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
