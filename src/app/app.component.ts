import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from './editor/models/menuItem';
import { MenuService } from './editor/services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppConfig } from './constants/app-config';
import { BaseComponent } from './components/base/base/base.component';
import { AuthService } from './services/auth.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  public menuItems:MenuItem[] = [];
  public sideBarOpen = false;
  public title: string;
  public isAuthenticated = false;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService, 
  ) {
    super();
    this.RegisterIcons();

    if(this.isMobile){
      this.title = AppConfig.AppShortTitle;
    }else{
      this.title = AppConfig.AppFullTitle;
    }
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroyed)).subscribe((item)=>{
      this.isAuthenticated = item;
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

    this.matIconRegistry.addSvgIcon(
      `sodales`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/sodales.svg'
      )
    );
  }
}
