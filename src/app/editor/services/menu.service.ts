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
      new MenuItem({ title: 'Проекты', action: 1, icon: 'works', link: '/', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Создать проект', action: 2, icon: 'add', link: '/new-project', type: MenuItemType.Normal  }),
      new MenuItem({ type: MenuItemType.Divider  }),
      new MenuItem({ title: 'Справочники', action: 2, icon: 'toc', link: '/', type: MenuItemType.Normal  }),
      new MenuItem({ title: 'Создать справочник', action: 2, icon: 'add', link: '/', type: MenuItemType.Normal  }),
    ]);
  }
}
