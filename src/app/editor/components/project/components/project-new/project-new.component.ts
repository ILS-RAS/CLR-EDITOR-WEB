import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { TaxonomyViewModel } from '../../../../models/taxonomyViewModel';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormControl, Validators } from '@angular/forms';
import { ProjectModel } from '../../../../models/projectModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '../../../../enums/action';
import { AppType } from '../../../../enums/appType';
import { ProjectStatus } from '../../../../enums/projectStatus';


@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss',
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
    private _bottomSheetRef: MatBottomSheetRef<ProjectNewComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.projectService.GetProjects().then(() => {
      this.projectService.projects.subscribe((projects)=>{
        this.projects = projects;
      });
    });
    this.projectService.loadAuthWorks().then(() => {
      this.projectService.authWorks.subscribe((items) => {
        this.works = items;
      });
    });
  }

  ProjectExists(code: string|undefined): boolean {
    return this.projects.filter(i=> code == i.code).length > 0;
  }

  Cancel() {
    this._bottomSheetRef.dismiss();
  }

  Save() {
    var p = new ProjectModel({});
    p.code = this.selected.value?.toString();
    p.desc = this.works.find(i => i.code == p.code)?.desc;
    p.created = new Date().toISOString();
    p.status = ProjectStatus.Edited;
    p.creatorId = sessionStorage.getItem("_id")?.toString();

    this.projectService.save(p).then((item)=>{
      this.Cancel();
      this.openSnackBar(JSON.stringify(item), Action.NewProject.toString());
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  Change() {
    this.isDisabled = this.selected.value == undefined;
    if(!this.isDisabled){
      this.label = "Код проекта";
    }
  }
}
