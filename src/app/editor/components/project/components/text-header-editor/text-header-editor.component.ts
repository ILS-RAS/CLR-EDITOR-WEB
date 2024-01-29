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
  header?:HeaderModel;
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
    this.projectService.$currentHeader.subscribe(item=>{
      if(item){
        this.header = item;
        this.editorForm.controls['codeInput'].setValue(item.code);
        this.editorForm.controls['editionTypeSelect'].setValue(item.editionType);
        this.editorForm.controls['langSelect'].setValue(item.lang);
        this.editorForm.controls['biblioInput'].setValue(item.desc);
      }
    })
  }

  Save() {
    if(!this.header){
      this.header = new HeaderModel({});
      this.header.projectId = this.projectService.$currentProject.value?._id;
    }
    this.header.code = this.editorForm.controls['codeInput'].value;
    this.header.editionType = this.editorForm.controls['editionTypeSelect'].value;
    this.header.lang = this.editorForm.controls['langSelect'].value;
    this.header.desc = this.editorForm.controls['biblioInput'].value;

    this.projectService.SaveHeader(this.header).then(item=>{
      let savedHeader = item as HeaderModel;
      if(savedHeader && savedHeader.projectId){
        this.projectService.GetHeaders(savedHeader.projectId).then(()=>{
          this.projectService.$currentHeader.next(undefined);
          this.dialogRef.close();
        })
      }
    })
  }
  Cancel() {
    this.dialogRef.close();
  }
}
