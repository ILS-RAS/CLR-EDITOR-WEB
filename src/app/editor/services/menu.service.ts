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
      new MenuItem({ title: 'Quaestio', action: Action.Search, icon: 'search', link: '/', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Proiectus', action: Action.OpenProject, icon: 'works', link: '/proiectus', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Lexicon', action: Action.OpenDictionary, icon: 'dictionary', link: '/lexicon', type: MenuItemType.Normal  }),
      new MenuItem({ title: 'Meta', action: Action.ManageTaxonomy, icon: 'toc', link: '/meta', type: MenuItemType.Normal  }),
      new MenuItem({ title: 'Sodales', action: Action.ManageUsers, icon: 'sodales', link: '/sodales', type: MenuItemType.Normal  })
    ]);
  }
}
