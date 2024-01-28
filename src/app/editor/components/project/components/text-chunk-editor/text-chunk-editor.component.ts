import { Component, Inject } from '@angular/core';
import { ChunkModel } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-chunk-editor',
  templateUrl: './text-chunk-editor.component.html',
  styleUrl: './text-chunk-editor.component.scss'
})
export class TextChunkEditorComponent {
  constructor(public dialogRef: MatDialogRef<TextChunkEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChunkModel){

    }
}
