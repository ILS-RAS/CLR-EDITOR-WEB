import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../../components/base/base/base.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent extends BaseComponent {

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
