import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-entry-element-editor',
  templateUrl: './entry-element-editor.component.html',
  styleUrl: './entry-element-editor.component.scss'
})
export class EntryElementEditorComponent extends BaseComponent {
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(public dialogRef: MatDialogRef<EntryElementEditorComponent>,
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any){
    super();
    this.form = this.formBuilder.group({
      valueInput: new UntypedFormControl(''),
    });
  }

  Save() {

    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }
}
