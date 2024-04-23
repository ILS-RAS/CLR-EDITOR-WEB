import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/layout.service';
import { AuthService } from '../services/auth.service';
import { BaseComponent } from '../components/base/base/base.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent extends BaseComponent {


  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService
  ) {
    super();
  }
  logout() {
    this.authService.logout('/auth');
    }
}
