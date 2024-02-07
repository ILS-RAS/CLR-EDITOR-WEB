import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ProjectModel, UserModel } from '../../../../models';
import { takeUntil } from 'rxjs';
import { ProjectService } from '../../../project/services/project.service';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEditorComponent } from '../../../project/components/project-editor/project-editor.component';

@Component({
  selector: 'app-user-project-list',
  templateUrl: './user-project-list.component.html',
  styleUrl: './user-project-list.component.scss'
})
export class UserProjectListComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() user?: UserModel;
  projects?: any;
  displayedColumns: string[] = ['code', 'desc', 'type', 'action'];
  constructor(private projectService: ProjectService, private dialog: MatDialog){
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.projectService.$projects.pipe(takeUntil(this.destroyed)).subscribe(projects=>{
      this.projects = projects.filter(i=>i.creatorId == this.user?._id).sort((a, b) => a.code!.localeCompare(b.code!)).slice(0, 10);
    });
  }
  
  ngOnInit(): void {
    
  }

  DeleteProject(project: ProjectModel) {
    this.dialog.open(ConfirmComponent, { width:'600px', data: project?.code })
    .afterClosed()
    .pipe(takeUntil(this.destroyed))
    .subscribe(resp =>{
      if(resp){
        this.projectService.MarkProjectDeleted(project).then(()=>{
          this.projectService.GetProjects();
          if(this.projectService.$currentProject.value?.code == project?.code){
            this.projectService.$currentProject.next(undefined);
          }
        })
      }
    });
  }

  GetDotEllipsis(str:string, max: number){
    return str.length > max ? "..." : "";
  }

  ReassignProject(project: ProjectModel) {
    this.dialog.open(ProjectEditorComponent, { width: '600px', data: project }).afterClosed().pipe(takeUntil(this.destroyed)).subscribe(()=>{
      this.projectService.GetProjects();
    });
  }
}
