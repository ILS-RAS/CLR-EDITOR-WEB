import { Component, Inject, OnInit } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrl: './project-selector.component.scss',
})
export class ProjectSelectorComponent implements OnInit {
  projects: ProjectModel[] = [];

  selected = new FormControl([Validators.required]);

  isDisabled: boolean = true;

  label: string = 'Выбрать проект ...';

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.projectService.GetProjects().then(() => {
      this.projectService.$projects.subscribe((projects) => {
        this.projects = projects;
      });
    });
  }

  Cancel() {
    this.dialogRef.close();
  }

  Open() {
    this.projectService.$currentProject.next(this.selected.value as unknown as ProjectModel);
    this.Cancel();
    this.router.navigateByUrl('/project');
  }

  Change() {
    this.isDisabled = this.selected.value == undefined;
    if (!this.isDisabled) {
      this.label = 'Код проекта';
    }
  }
}
