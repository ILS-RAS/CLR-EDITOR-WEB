import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { MenuItemType } from '../enums/menuItemType';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuData = new ReplaySubject<MenuItem[]>(1);

  menuItems$: ReplaySubject<MenuItem[]> = this.menuData;

  constructor() {
    this.GetMenuItems();
  }

  GetMenuItems() {
    this.menuData.next([
      new MenuItem({ title: 'Aperire Opus', action: 1, icon: 'folder_open', link: '/', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Addere Opus', action: 2, icon: 'add', link: '/', type: MenuItemType.Normal  })
    ]);
  }
}
