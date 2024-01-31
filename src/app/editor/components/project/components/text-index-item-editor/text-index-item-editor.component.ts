import { Component, Inject } from '@angular/core';
import { IndexModel } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-text-index-item-editor',
  templateUrl: './text-index-item-editor.component.html',
  styleUrl: './text-index-item-editor.component.scss'
})
export class TextIndexItemEditorComponent extends BaseComponent {
  constructor(public dialogRef: MatDialogRef<TextIndexItemEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndexModel){
      super();
    }
}
