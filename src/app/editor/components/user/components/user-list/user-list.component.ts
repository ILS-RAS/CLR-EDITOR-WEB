import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { ProjectModel, UserModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent extends BaseModel implements OnInit {
  displayedColumns: string[] = ['ratio', 'proiectus', 'mutatio'];
  dataSource?: any;
  projects?: ProjectModel[];
  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.$users.subscribe((users) => {
      this.dataSource = users;
    });
    this.projectService.$projects.subscribe((projects) => {
      this.projects = projects.sort((a, b) => a.code!.localeCompare(b.code!));
    });
  }

  public getUserProjects(id: string): ProjectModel[] {
    let selected = this.projects?.filter((i) => i.creatorId == id);
    return selected ?? [];
  }

  EditUser(user: UserModel) {
    //Call modal editor
  }

  AssignProject(userId: string) {
    
  }

  RejectProject(projectId?: string, userId?: string) {
    
  }
}
