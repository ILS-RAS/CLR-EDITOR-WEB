import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderModel } from '../../../../models';

@Component({
  selector: 'app-text-header-editor',
  templateUrl: './text-header-editor.component.html',
  styleUrl: './text-header-editor.component.scss'
})
export class TextHeaderEditorComponent {
  constructor(public dialogRef: MatDialogRef<TextHeaderEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeaderModel){

    }
}
