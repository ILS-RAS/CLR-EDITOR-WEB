import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, LayoutModule, DialogModule, ButtonModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}