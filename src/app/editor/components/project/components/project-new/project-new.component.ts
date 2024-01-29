import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { TaxonomyViewModel } from '../../../../models/taxonomyViewModel';
import { FormControl, Validators } from '@angular/forms';
import { ProjectModel } from '../../../../models/projectModel';
import { ProjectStatus } from '../../../../enums/projectStatus';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MetaService } from '../../services/meta.service';
import { TaxonomyCategory } from '../../../../enums';
@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss'
})
export class ProjectNewComponent implements OnInit {

  works: TaxonomyViewModel[] = [];

  projects: ProjectModel[] = [];

  selected = new FormControl([Validators.required]);

  isDisabled:boolean = true;

  label:string = "Выбрать код проекта ...";

  constructor(
    private projectService: ProjectService,
    private metaService:MetaService,
    private router: Router,
    public dialogRef: MatDialogRef<ProjectNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel
  ) {}

  ngOnInit(): void {
    this.projectService.GetProjects().then(() => {
      this.projectService.$projects.subscribe((projects)=>{
        this.projects = projects;
      });
    });

    this.works = this.metaService.GetByCategory(TaxonomyCategory.AuthWork);
  }

  ProjectExists(code: string|undefined): boolean {
    return this.projects.filter(i=> code == i.code).length > 0;
  }

  Cancel() {
    this.dialogRef.close();
  }

  CreateAndOpen() {
    var p = new ProjectModel({});
    p.code = this.selected.value?.toString();
    p.desc = this.works.find(i => i.code == p.code)?.desc;
    p.created = new Date().toISOString();
    p.status = ProjectStatus.Edited;
    p.creatorId = sessionStorage.getItem("_id")?.toString();

    this.projectService.SaveProject(p).then((item)=>{
      let savedProject = item as ProjectModel;
      if(savedProject){
        this.projectService.InitContext(savedProject);
      }
      this.Cancel();
      this.router.navigateByUrl('/proiectus');
    });
  }

  Change() {
    this.isDisabled = this.selected.value == undefined;
    if(!this.isDisabled){
      this.label = "Код проекта";
    }
  }
}
