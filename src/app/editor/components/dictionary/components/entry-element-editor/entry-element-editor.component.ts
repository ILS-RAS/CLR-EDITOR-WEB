import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TaxonomyModel } from '../../../../models';
import { EntryElementType } from '../../../../enums';
import { takeUntil } from 'rxjs';
import { Helper } from '../../../../../utils';

@Component({
  selector: 'app-entry-element-editor',
  templateUrl: './entry-element-editor.component.html',
  styleUrl: './entry-element-editor.component.scss'
})
export class EntryElementEditorComponent extends BaseComponent {
  types:TaxonomyModel[] = [];
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(public dialogRef: MatDialogRef<EntryElementEditorComponent>,
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any){
    super();
    this.form = this.formBuilder.group({
      typeSelect: new UntypedFormControl('')
    });
    this.types.push(new TaxonomyModel({
      code: EntryElementType.lemma,
      desc: EntryElementType.lemma
    }));

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => (this.isDisabled = !Helper.IsFormValid(val)));
  }

  Save() {

    this.dialogRef.close(true);
  }
  Cancel() {
    this.dialogRef.close();
  }
}
