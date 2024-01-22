import { Component } from '@angular/core';
import { AppConfig } from '../../../constants/app-config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version: string = AppConfig.AppVersion;

  copyright: string = `${AppConfig.Copyright} ${new Date().getFullYear()}`;

}
