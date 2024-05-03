import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { HeaderModel, ProjectModel } from '../../../../models';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { ProjectSelectorComponent } from '../project-selector/project-selector.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent extends BaseComponent implements OnInit {
  public project?: ProjectModel;
  public header?:HeaderModel;
  public visible: boolean = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
  ) {
      super();
  }
  ngOnInit(): void {
    
    this.projectService.$currentProject.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.project = item;
      if(!this.project){
        this.dialog.open(ProjectSelectorComponent, { width: '600px' });
      }else{
        this.visible = true;
      }
    });
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.header = item;
    });
  }

  Close() {
    this.visible = false;
    this.projectService.$currentProject.next(undefined);
    this.router.navigateByUrl('/project');
  }

}
