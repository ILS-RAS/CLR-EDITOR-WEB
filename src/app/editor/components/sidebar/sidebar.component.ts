import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { Action } from '../../enums/action';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ProjectNewComponent } from '../project/components/project-new/project-new.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  click(item: MenuItem) {
    if(item.action == Action.NewProject){
      this._bottomSheet.open(ProjectNewComponent, {
        hasBackdrop: false,
        autoFocus: 'first-tabbable',
        closeOnNavigation: true
      });
    }
    this.menuItemSelected.emit(item);
  }
}
