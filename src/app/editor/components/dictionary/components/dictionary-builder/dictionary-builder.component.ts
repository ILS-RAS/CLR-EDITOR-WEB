import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderModel, ProjectModel, TaxonomyViewModel } from '../../../../models';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MetaService } from '../../../project/services/meta.service';
import { takeUntil } from 'rxjs';
import { Language, TaxonomyCategory } from '../../../../enums';
import { ProjectService } from '../../../project/services/project.service';
import { HeaderQuery } from '../../../../queries';

@Component({
  selector: 'app-dictionary-builder',
  templateUrl: './dictionary-builder.component.html',
  styleUrl: './dictionary-builder.component.scss',
})
export class DictionaryBuilderComponent
  extends BaseComponent
  implements OnInit
{
  isDisabled: boolean = false;
  languages?: TaxonomyViewModel[];
  taxonomy?: TaxonomyViewModel[];
  headers?: HeaderModel[];
  langFormGroup = this.formBuilder.group({
    langSelect: ['', Validators.required],
  });
  textFormGroup = this.formBuilder.group({
    headerSelect: [''],
  });
  authorFormGroup = this.formBuilder.group({
    authorSelect: [''],
  });
  centuryFormGroup = this.formBuilder.group({
    centurySelect: [''],
  });
  workFormGroup = this.formBuilder.group({
    workSelect: [''],
  });
  isEditable = true;
  isLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<DictionaryBuilderComponent>,
    @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
    private formBuilder: UntypedFormBuilder,
    private metaService: MetaService,
    private projectService: ProjectService
  ) {
    super();
  }
  ngOnInit(): void {
    this.languages = this.metaService
      .GetByCategory(TaxonomyCategory.Lang)
      .filter((i) => i.code == Language.lat || i.code == Language.rus);
  }

  LangChanged(lang: string) {

  }

  Save() {
    this.dialogRef.close();
  }

  Cancel() {
    this.dialogRef.close();
  }
}
