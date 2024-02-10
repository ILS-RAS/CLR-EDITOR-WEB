import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ProjectModel, TaxonomyViewModel, UserModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { MetaService } from '../../../project/services/meta.service';
import { UserService } from '../../../user/services/user.service';
import { takeUntil } from 'rxjs';
import { ProjectStatus } from '../../../../enums';
import { ProjectType } from '../../../../enums/projectType';
import { Helper } from '../../../../../utils';

@Component({
  selector: 'app-dictionary-editor',
  templateUrl: './dictionary-editor.component.html',
  styleUrl: './dictionary-editor.component.scss',
})
export class DictionaryEditorComponent extends BaseComponent implements OnInit {
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  projectCodes?: TaxonomyViewModel[];
  projects: ProjectModel[] = [];
  users?: UserModel[];

  constructor(
    public dialogRef: MatDialogRef<DictionaryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
    private formBuilder: UntypedFormBuilder,
    private projectService: ProjectService,
    private userService: UserService
  ) {
    super();
    this.form = this.formBuilder.group({
      projectCodeInput: new UntypedFormControl(''),
      descInput: new UntypedFormControl(''),
      userSelect: new UntypedFormControl(''),
    });
  }
  ngOnInit(): void {
    this.projectService.$projects
      .pipe(takeUntil(this.destroyed))
      .subscribe((projects) => {
        this.projects = projects;
      });

    this.userService.$users.subscribe((users) => {
      this.users = users.sort((a, b) => a.name!.localeCompare(b.name!));
    });

    this.form.controls['projectCodeInput'].setValue(this.project.code);

    this.form.controls['descInput'].setValue(this.project.desc);

    this.form.controls['userSelect'].setValue(this.project.creatorId);

    this.form.statusChanges.pipe(takeUntil(this.destroyed)).subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  ProjectExists(code: string|undefined): boolean {
    return this.projects.filter(i=> code == i.code).length > 0;
  }

  Save() {
    this.project.code = this.form.controls['projectCodeInput'].value;
    this.project.created = new Date().toISOString();
    this.project.status = ProjectStatus.Edited;
    this.project.creatorId = this.form.controls['userSelect'].value;
    this.project.desc = this.form.controls['descInput'].value;
    this.project.projectType = ProjectType.Dictionary;
    this.projectService.SaveProject(this.project).then(() => {
      this.dialogRef.close();
    });
  }
  
  Cancel() {
    this.dialogRef.close();
  }
}
