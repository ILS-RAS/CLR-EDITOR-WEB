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
import { MenuService } from '../../services/menu.service';
import { BaseComponent } from '../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private uiService: UiService,
    private menuService:MenuService
  ) {
    super();
  }

  ngOnInit(): void {
    
    this.menuService.menuItems$.pipe(takeUntil(this.destroyed)).subscribe(items => {
      this.menuItems = items;
    });
  }

  click(item: MenuItem) {
    if (item.action == Action.NewProject) {
      this.dialog.open(ProjectEditorComponent, { width: '600px', data: new ProjectModel({}) }).afterClosed().pipe(takeUntil(this.destroyed)).subscribe(()=>{
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
    if(item.action == Action.ManageTaxonomy){
      this.router.navigateByUrl('/meta');
    }

    if(item.action == Action.ManageUsers){
      this.router.navigateByUrl('/sodales');
    }
    
    if(item.action == Action.OpenDictionary){
      this.router.navigateByUrl('/lexicon');
    }
    this.menuItemSelected.emit(item);
  }
}
