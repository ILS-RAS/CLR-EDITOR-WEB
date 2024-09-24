import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { HeaderModel, ProjectModel } from '../../../../models';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  providers:[MessageService]
})
export class DefaultComponent extends BaseComponent implements OnInit {
  public project?: ProjectModel;
  public header?:HeaderModel;
  public visible: boolean = false;
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
      super();
  }
  ngOnInit(): void {
    
    this.projectService.$currentProject.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.project = item;
    });

    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.header = item;
    });

    this.projectService.$contentVisible.pipe(takeUntil(this.destroyed)).subscribe(visible=>{
      this.visible = visible;
    });
    
  }

  Close() {
    this.visible = false;
    this.projectService.$currentProject.next(undefined);
    this.router.navigateByUrl('/project');
  }

}
