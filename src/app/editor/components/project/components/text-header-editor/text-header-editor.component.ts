import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderModel, TaxonomyViewModel } from '../../../../models';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MetaService } from '../../services/meta.service';
import { ProjectStatus, TaxonomyCategory } from '../../../../enums';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-header-editor',
  templateUrl: './text-header-editor.component.html',
  styleUrl: './text-header-editor.component.scss',
})
export class TextHeaderEditorComponent implements OnInit {
  isDisabled: boolean = true;
  editorForm: UntypedFormGroup;
  languages?:TaxonomyViewModel[];
  editionTypes?: TaxonomyViewModel[];
  constructor(
    public dialogRef: MatDialogRef<TextHeaderEditorComponent>,
    private metaService: MetaService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: HeaderModel,
    private formBuilder: UntypedFormBuilder
  ) {
    this.editorForm = this.formBuilder.group({
      codeInput: new UntypedFormControl(''),
      langSelect: new UntypedFormControl(''),
      biblioInput: new UntypedFormControl(''),
      editionTypeSelect:new UntypedFormControl('')
    });
  }
  ngOnInit(): void {
    this.languages = this.metaService.GetByCategory(TaxonomyCategory.Lang);
    this.editionTypes = this.metaService.GetByCategory(TaxonomyCategory.EditionType);
  }

  Save() {
    let header = new HeaderModel({})
    header.code = this.editorForm.controls['codeInput'].value;
    header.editionType = this.editorForm.controls['editionTypeSelect'].value;
    header.lang = this.editorForm.controls['langSelect'].value;
    header.desc = this.editorForm.controls['biblioInput'].value;
    header.projectId = this.projectService.$currentProject.value?._id;
    this.projectService.SaveHeader(header).then(item=>{
      let savedHeader = item as HeaderModel;
      if(savedHeader && savedHeader.projectId){
        this.projectService.GetHeaders(savedHeader.projectId).then(()=>{
          this.dialogRef.close();
        })
      }
    })
  }
  Cancel() {
    this.dialogRef.close();
  }
}
