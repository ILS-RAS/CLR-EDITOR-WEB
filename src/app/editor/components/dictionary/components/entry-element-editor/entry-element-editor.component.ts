import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { TaxonomyModel } from '../../../../models';
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
  selectedType?: string;
  types: TaxonomyModel[] = [];
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  value: any;
  constructor(
    public dialogRef: MatDialogRef<EntryElementEditorComponent>,
    private dictionaryService: DictionaryService,
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EntryElementModel
  ) {
    super();
    this.form = this.formBuilder.group({
      typeSelect: new UntypedFormControl(''),
      inputTextValue: new UntypedFormControl('')
    });

    this.types = this.dictionaryService.getEntryElementTypes();

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => (this.isDisabled = !Helper.IsFormValid(val)));
  }

  typeChange() {
    this.selectedType = this.form.controls['typeSelect'].value;
  }

  valueChange($event: any) {
    this.value = $event;
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
      value: this.value
    });

    this.dialogRef.close(element);

  }

  Cancel() {
    this.dialogRef.close(undefined);
  }
}
