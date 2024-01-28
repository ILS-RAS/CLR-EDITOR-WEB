import { Component, Inject } from '@angular/core';
import { IndexModel } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-index-item-editor',
  templateUrl: './text-index-item-editor.component.html',
  styleUrl: './text-index-item-editor.component.scss'
})
export class TextIndexItemEditorComponent {
  constructor(public dialogRef: MatDialogRef<TextIndexItemEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndexModel){

    }
}
