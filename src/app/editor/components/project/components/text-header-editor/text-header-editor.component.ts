import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderModel, InterpModel, TaxonomyViewModel } from '../../../../models';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MetaService } from '../../services/meta.service';
import {
  EditionType,
  Language,
  ProjectStatus,
  TaxonomyCategory,
} from '../../../../enums';
import { ProjectService } from '../../services/project.service';
import { Helper } from '../../../../../utils';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-text-header-editor',
  templateUrl: './text-header-editor.component.html',
  styleUrl: './text-header-editor.component.scss',
})
export class TextHeaderEditorComponent extends BaseComponent implements OnInit {
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  languages?: TaxonomyViewModel[];
  editionTypes?: TaxonomyViewModel[];
  title?:string;
  constructor(
    public dialogRef: MatDialogRef<TextHeaderEditorComponent>,
    private metaService: MetaService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public header: HeaderModel,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      codeInput: new UntypedFormControl(''),
      langSelect: new UntypedFormControl(''),
      biblioInput: new UntypedFormControl(''),
      editionTypeSelect: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    if (!this.header._id) {
      if (!this.projectService.$projectHeaders.value || this.projectService.$projectHeaders.value.length == 0) {
        this.editionTypes = this.metaService
          .GetByCategory(TaxonomyCategory.EditionType)
          .filter((i) => i.code == EditionType.Original);
        this.languages = this.metaService
          .GetByCategory(TaxonomyCategory.Lang)
          .filter((i) => i.code == Language.lat);

          this.form.controls['editionTypeSelect'].setValue(EditionType.Original);
          this.form.controls['langSelect'].setValue(Language.lat);
          this.title = 'Editio originalis';
      }
      if (
        this.projectService.$projectHeaders.value &&
        this.projectService.$projectHeaders.value.length >= 1
      ) {
        this.editionTypes = this.metaService
          .GetByCategory(TaxonomyCategory.EditionType)
          .filter((i) => i.code == EditionType.Interpretation);
        this.languages = this.metaService
          .GetByCategory(TaxonomyCategory.Lang)
          .filter((i) => i.code == Language.rus);
          this.form.controls['editionTypeSelect'].setValue(EditionType.Interpretation);
          this.form.controls['langSelect'].setValue(Language.rus);
          this.title = 'Interpretatio';
      }

    } else {
      this.editionTypes = this.metaService
        .GetByCategory(TaxonomyCategory.EditionType)
        .filter((i) => i.code == this.header.editionType);
      this.languages = this.metaService
        .GetByCategory(TaxonomyCategory.Lang)
        .filter((i) => i.code == this.header.lang);


        if(this.header.editionType == EditionType.Original){
          this.title = 'Editio originalis';
        }else{
          this.title = 'Interpretatio';
        }

    this.form.controls['codeInput'].setValue(this.header.code);
    this.form.controls['editionTypeSelect'].setValue(this.header.editionType);
    this.form.controls['langSelect'].setValue(this.header.lang);
    this.form.controls['biblioInput'].setValue(this.header.desc);
    }

    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Save() {
    this.header.projectId = this.projectService.$currentProject.value?._id;
    this.header.code = this.form.controls['codeInput'].value;
    this.header.editionType = this.form.controls['editionTypeSelect'].value;
    this.header.lang = this.form.controls['langSelect'].value;
    this.header.desc = this.form.controls['biblioInput'].value;

    this.projectService.SaveHeader(this.header).then((item) => {
      let savedHeader = item as HeaderModel;
      if (savedHeader && savedHeader.projectId) {
        this.projectService.GetHeaders(savedHeader.projectId).then(() => {
          this.dialogRef.close();
        });
      }
    });
  }
  Cancel() {
    this.dialogRef.close();
  }
}
