import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ProjectType } from '../../../../enums/projectType';
import { ProjectModel } from '../../../../models/projectModel';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrl: './project-selector.component.scss',
})
export class ProjectSelectorComponent extends BaseComponent implements OnInit {  
  projects: ProjectModel[] = [];

  selected!: ProjectModel;

  isDisabled: boolean = false;
  
  visible: boolean = true;

  label: string = 'Выбрать проект ...';

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {
    super();
    
  }
  ngOnInit(): void {
    this.projectService.GetProjects().then(()=>{
      this.projectService.$projects.pipe(takeUntil(this.destroyed)).subscribe(items=>{
        this.projects = items.filter(i=>i.projectType == ProjectType.Text).sort((a, b) => a.code!.localeCompare(b.code!));
      });
    })
  }

  Cancel() {
    this.visible = false;
  }

  Clear() {
    this.projectService.InitProjectContext(undefined);
  }

  Change() {
    let selectedProject = this.selected as unknown as ProjectModel;
    if(selectedProject && selectedProject._id){
      this.projectService.InitProjectContext(selectedProject);
      this.projectService.GetHeadersByProjectId(selectedProject._id);
    }
  }
}
