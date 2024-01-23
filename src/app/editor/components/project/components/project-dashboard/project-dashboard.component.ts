import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../../../models/projectModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent implements OnInit {
  public project?: ProjectModel;
  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.projectService.currentProject.subscribe(item=>{
      this.project = item;
    })
  }

  Close() {
    this.projectService.currentProject.next(undefined);
    this.router.navigateByUrl('/');
    }
}
