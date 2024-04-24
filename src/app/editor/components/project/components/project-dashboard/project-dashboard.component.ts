import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../../../models/projectModel';
import { Router } from '@angular/router';
import { HeaderModel } from '../../../../models/headerModel';
import { UiService } from '../../../../../services/ui.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProjectSelectorComponent } from '../project-selector/project-selector.component';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent extends BaseComponent implements OnInit {


  public project?: ProjectModel;
  public header?:HeaderModel;
  public drawerOpened?: boolean;
  
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private uiService: UiService,
    public dialog: MatDialog,
  ) {
      super();
  }
  
  ngOnInit(): void {
    this.projectService.$currentProject.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.project = item;
      if(!this.project){
        this.dialog.open(ProjectSelectorComponent, { width: '600px' });
      }
    });
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.header = item;
    });
    this.uiService.$indexPanelOpened.pipe(takeUntil(this.destroyed)).subscribe(state=>{
      this.drawerOpened = state;
    });
  }

  Close() {
    this.projectService.$currentProject.next(undefined);
    this.uiService.Reset();
    this.router.navigateByUrl('/project');
  }
}
