import { Component } from '@angular/core';
import { AppConfig } from '../../constants/app-config';
import { BaseComponent } from '../base/base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent extends BaseComponent {
  version: string = AppConfig.AppVersion;

  copyright: string = `${AppConfig.Copyright} ${new Date().getFullYear()}`;

}
