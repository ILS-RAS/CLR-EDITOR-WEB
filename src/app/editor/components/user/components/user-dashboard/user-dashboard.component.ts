import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { ProjectModel, UserModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEditorComponent } from '../../../project/components/project-editor/project-editor.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent extends BaseComponent implements OnInit {
  user?: UserModel;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private dialog:MatDialog
  ) {
    super();
  }
  ngOnInit(): void {
    this.userService.GetUsers();
    this.userService.$user.pipe(takeUntil(this.destroyed)).subscribe((user) => {
      this.user = user;
    });
  }

  CreateUser() {
    throw new Error('Method not implemented.');
  }

  CreateAndAssignProject() {
    this.dialog.open(ProjectEditorComponent, { width: '600px', data: new ProjectModel({}) }).afterClosed().pipe(takeUntil(this.destroyed)).subscribe(()=>{
      this.projectService.GetProjects();
    });
  }

}
