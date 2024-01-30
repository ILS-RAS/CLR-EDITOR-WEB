import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../../../models/projectModel';
import { Router } from '@angular/router';
import { HeaderModel } from '../../../../models/headerModel';
import { UiService } from '../../../../../services/ui.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboardComponent implements OnInit {


  public project?: ProjectModel;
  public header?:HeaderModel;
  public drawerOpened?: boolean;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private uiService: UiService
  ) {}
  
  ngOnInit(): void {
    this.projectService.$currentProject.subscribe(item=>{
      this.project = item;
    });
    this.projectService.$currentHeader.subscribe(item=>{
      this.header = item;
    });
    this.uiService.$indexPanelOpened.subscribe(state=>{
      this.drawerOpened = state;
    })
  }

  Close() {
    this.projectService.$currentProject.next(undefined);
    this.router.navigateByUrl('/');
    }
}
