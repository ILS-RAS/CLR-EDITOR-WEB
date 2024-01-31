import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { Action } from '../../enums/action';
import { MatDialog } from '@angular/material/dialog';
import { ProjectSelectorComponent } from '../project/components/project-selector/project-selector.component';
import { ProjectService } from '../project/services/project.service';
import { Router } from '@angular/router';
import { ProjectEditorComponent } from '../project/components/project-editor/project-editor.component';
import { ProjectModel } from '../../models';
import { UiService } from '../../../services/ui.service';

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
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {}

  click(item: MenuItem) {
    if (item.action == Action.NewProject) {
      this.dialog.open(ProjectEditorComponent, { width: '600px', data: new ProjectModel({}) }).afterClosed().subscribe(()=>{
        this.projectService.InitContext(this.projectService.$currentProject.value as ProjectModel);
        this.uiService.Reset();
        this.router.navigateByUrl('/proiectus');
      });
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
