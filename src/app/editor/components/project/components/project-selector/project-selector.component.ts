import { Component, Inject, OnInit } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { ProjectType } from '../../../../enums/projectType';

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
    public dialogRef: MatDialogRef<ProjectSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel,
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
    this.dialogRef.close();
  }

  Open() {
    let selectedProject = this.selected as unknown as ProjectModel;
    if(selectedProject){
      this.projectService.InitProjectContext(selectedProject);
      this.Cancel();
      this.router.navigateByUrl('/project');
    }
  }

  Change() {
    this.isDisabled = this.selected == undefined;
    if (!this.isDisabled) {
      this.label = 'Код проекта';
    }
  }
}
