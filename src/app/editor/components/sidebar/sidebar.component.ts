import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { Action } from '../../enums/action';
import { ProjectNewComponent } from '../project/components/project-new/project-new.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectSelectorComponent } from '../project/components/project-selector/project-selector.component';
import { ProjectService } from '../project/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  click(item: MenuItem) {
    if (item.action == Action.NewProject) {
      this.dialog.open(ProjectNewComponent, { width: '600px' });
    }
    if (item.action == Action.OpenProject) {
      if (this.projectService.$currentProject.value) {
        this.router.navigateByUrl('/proiectus');
      } else {
        this.dialog.open(ProjectSelectorComponent, { width: '600px' });
      }
    }
    this.menuItemSelected.emit(item);
  }
}
