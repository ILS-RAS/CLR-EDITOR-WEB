import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from './editor/models/menuItem';
import { MenuService } from './editor/services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppConfig } from './constants/app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems:MenuItem[] = [];
  sideBarOpen = false;
  deviceInfo?:object = undefined;
  title: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private readonly nemuService: MenuService, 
    private deviceService: DeviceDetectorService
  ) {
    this.RegisterIcons();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.title = AppConfig.AppShortTitle;
    }else{
      this.title = AppConfig.AppFullTitle;
    }
  }
  
  menuItemSelected(menuItem: MenuItem) {
    //this.sideBarOpen = false;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  ngOnInit(): void {
    this.nemuService.menuItems$.pipe().subscribe(items => {
      this.menuItems = items;
    });
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
    this.matIconRegistry.addSvgIcon(
      `book`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/book.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `bullet`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/bullet.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `more`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/read_more.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      `more_vert`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/more_vert.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `left_panel_close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/left_panel_close.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `left_panel_open`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/left_panel_open.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      `dictionary`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/dictionary.svg'
      )
    );
  }
}
