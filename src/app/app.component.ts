import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.RegisterIcons();
  }

  private RegisterIcons() {
    this.matIconRegistry.addSvgIcon(
      `exit`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/exit.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `add`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/add.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `menu`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/menu.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `logo`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/icons/logo.svg'
        )
      );
    this.matIconRegistry.addSvgIcon(
      `works`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/works.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `toc`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/toc.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `add_toc`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/add_toc.svg'
      )
    );
  }
}
