import { Component, Inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { TaxonomyViewModel } from '../../../../models/taxonomyViewModel';
import { FormControl, Validators } from '@angular/forms';
import { ProjectModel } from '../../../../models/projectModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '../../../../enums/action';
import { ProjectStatus } from '../../../../enums/projectStatus';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
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
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjectNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel,
  ) {}

  ngOnInit(): void {
    this.projectService.GetProjects().then(() => {
      this.projectService.$projects.subscribe((projects)=>{
        this.projects = projects;
      });
    });
    this.projectService.GetWorkTaxonomy().then(() => {
      this.projectService.$authWorks.subscribe((items) => {
        this.works = items;
      });
    });
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
      this.projectService.GetProjects().then(()=>{
        let savedProject = this.projects.find(i=>i.code == p.code);
        if(savedProject){
          this.projectService.InitContext(savedProject)
        }
      })
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
