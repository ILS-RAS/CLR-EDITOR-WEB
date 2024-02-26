import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { TaxonomyModel } from '../../../../models';
import { EntryElementType, EntryStructType } from '../../../../enums';
import { takeUntil } from 'rxjs';
import { Helper } from '../../../../../utils';
import { DictionaryService } from '../../services/dictionary.service';
import { EntryElementModel } from '../../../../models/entryElementModel';

@Component({
  selector: 'app-entry-element-editor',
  templateUrl: './entry-element-editor.component.html',
  styleUrl: './entry-element-editor.component.scss',
})
export class EntryElementEditorComponent extends BaseComponent {
  types: TaxonomyModel[] = [];
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<EntryElementEditorComponent>,
    private dictionaryService: DictionaryService,
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EntryElementModel
  ) {
    super();
    this.form = this.formBuilder.group({
      typeSelect: new UntypedFormControl(''),
    });

    this.types = this.dictionaryService.getEntryElementTypes();

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => (this.isDisabled = !Helper.IsFormValid(val)));
  }

  Save() {

    let entryElements: EntryElementModel[] = [];

    if(this.dictionaryService.$currentEntry.value?.entryObj){

      entryElements = JSON.parse(this.dictionaryService.$currentEntry.value?.entryObj);

    }

    let element = new EntryElementModel({
      _id: Helper.newGuid(),
      type: this.form.controls['typeSelect'].value,
      order: entryElements.filter(e=>e.parentId == this.data._id).length + 1,
      parentId: this.data._id,
      value: ''
    });

    this.dialogRef.close(element);

  }

  Cancel() {
    this.dialogRef.close(undefined);
  }
}
