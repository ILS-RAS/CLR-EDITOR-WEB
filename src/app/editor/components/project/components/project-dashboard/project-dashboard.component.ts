import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../../../models/projectModel';
import { Router } from '@angular/router';
import { HeaderModel } from '../../../../models/headerModel';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ProjectDashboardComponent implements OnInit {
  public project?: ProjectModel;
  public header?:HeaderModel;
  showFiller = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.projectService.$currentProject.subscribe(item=>{
      this.project = item;
    });
    this.projectService.$currentHeader.subscribe(item=>{
      this.header = item;
    })
  }

  Close() {
    this.projectService.$currentProject.next(undefined);
    this.router.navigateByUrl('/');
    }
}
