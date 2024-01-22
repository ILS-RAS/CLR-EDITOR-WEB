import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { MenuService } from '../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppConfig } from '../../../constants/app-config';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements OnInit {
  showFiller = true;
  menuItems:MenuItem[] = [];
  sideBarOpen = false;
  deviceInfo?:object = undefined;
  title: string;
  
  constructor(private readonly nemuService: MenuService, private deviceService: DeviceDetectorService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      this.title = AppConfig.AppShortTitle;
    }else{
      this.title = AppConfig.AppFullTitle;
    }
  }

  menuItemSelected(menuItem: MenuItem) {
    this.sideBarOpen = false;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  ngOnInit(): void {
    this.nemuService.menuItems$.pipe().subscribe(items => {
      this.menuItems = items;
    });
  }
}
