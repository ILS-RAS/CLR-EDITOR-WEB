import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { ProjectModel, UserModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEditorComponent } from '../../../project/components/project-editor/project-editor.component';
import { UserEditorComponent } from '../user-editor/user-editor.component';
import { DictionaryEditorComponent } from '../../../dictionary/components/dictionary-editor/dictionary-editor.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent extends BaseComponent implements OnInit {
  user?: UserModel;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private dialog:MatDialog
  ) {
    super();
  }
  ngOnInit(): void {
    this.userService.$user.pipe(takeUntil(this.destroyed)).subscribe((user) => {
      this.user = user;
    });
  }

  CreateUser() {
    this.dialog.open(UserEditorComponent, { width: '600px', data: new UserModel({}) }).afterClosed().pipe(takeUntil(this.destroyed)).subscribe((res)=>{
      this.userService.GetUsers();
    });
  }

  CreateAndAssignProject() {
    this.dialog.open(ProjectEditorComponent, { width: '600px', data: new ProjectModel({}) }).afterClosed().pipe(takeUntil(this.destroyed)).subscribe((res)=>{
      this.projectService.GetProjects();
    });
  }

  CreateAndAssignDictionary(){
    this.dialog.open(DictionaryEditorComponent, {width: '600px', data: new ProjectModel({})}).afterClosed().pipe(takeUntil(this.destroyed)).subscribe((res)=>{
      this.projectService.GetProjects();
    });
  }

}
