import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MenuItem } from '../models/menuItem';
import { MenuItemType } from '../enums/menuItemType';
import { Action } from '../enums/action';

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
      new MenuItem({ title: 'Проекты', action: Action.OpenProject, icon: 'works', link: '/', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Создать проект', action: Action.NewProject, icon: 'add', link: '/', type: MenuItemType.Normal  }),
      new MenuItem({ type: MenuItemType.Divider  }),
      new MenuItem({ title: 'Справочники', action: Action.OpenTaxonomy, icon: 'toc', link: '/', type: MenuItemType.Normal  }),
      new MenuItem({ title: 'Создать справочник', action: Action.NewTaxonomy, icon: 'add', link: '/', type: MenuItemType.Normal  }),
    ]);
  }
}
