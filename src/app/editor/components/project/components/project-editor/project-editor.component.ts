import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ProjectModel, TaxonomyModel, TaxonomyViewModel, UserModel } from '../../../../models';
import { Helper } from '../../../../../utils';
import { ProjectStatus, TaxonomyCategory } from '../../../../enums';
import { MetaService } from '../../services/meta.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { ProjectType } from '../../../../enums/projectType';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss',
})
export class ProjectEditorComponent extends BaseComponent implements OnInit {
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  projectCodes?: TaxonomyViewModel[];
  projects: ProjectModel[] = [];
  users?: UserModel[];

  constructor(
    public dialogRef: MatDialogRef<ProjectEditorComponent>,
    private projectService: ProjectService,
    private metaService: MetaService,
    private userService:UserService,

    @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      projectCodeSelect: new UntypedFormControl(''),
      userSelect: new UntypedFormControl('')
    });
  }

  ngOnInit(): void {
    this.projectService.$projects.pipe(takeUntil(this.destroyed)).subscribe((projects)=>{
      this.projects = projects;
    });
    
    this.userService.$users.subscribe((users) => {
      this.users = users.sort((a, b) => a.name!.localeCompare(b.name!));
    });

    this.projectCodes = this.metaService.GetByCategory(TaxonomyCategory.AuthWork).sort((a, b) => a.code!.localeCompare(b.code!));

    this.form.controls['projectCodeSelect'].setValue(this.project.code);

    this.form.controls['userSelect'].setValue(this.project.creatorId);

    this.form.statusChanges.pipe(takeUntil(this.destroyed)).subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );

  }
  ProjectExists(code: string|undefined): boolean {
    return this.projects.filter(i=> code == i.code).length > 0;
  }
  Save() {
    this.project.code = this.form.controls['projectCodeSelect'].value;
    this.project.created = new Date().toISOString();
    this.project.status = ProjectStatus.Edited;
    this.project.creatorId = this.form.controls['userSelect'].value;
    this.project.desc = this.projectCodes?.find(i=>i.code == this.project.code)?.desc;
    this.project.projectType = ProjectType.Text;
    this.projectService.SaveProject(this.project).then(() => {
      this.dialogRef.close();
    });
  }

  Cancel() {
    this.dialogRef.close();
  }
}
