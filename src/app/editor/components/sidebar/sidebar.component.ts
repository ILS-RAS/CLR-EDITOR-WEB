import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { Action } from '../../enums/action';
import { ProjectNewComponent } from '../project/components/project-new/project-new.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectSelectorComponent } from '../project/components/project-selector/project-selector.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  click(item: MenuItem) {
    if(item.action == Action.NewProject){
      this.dialog.open(ProjectNewComponent);
    }
    if(item.action == Action.OpenProject){
      this.dialog.open(ProjectSelectorComponent);
    }
    this.menuItemSelected.emit(item);
  }
}
