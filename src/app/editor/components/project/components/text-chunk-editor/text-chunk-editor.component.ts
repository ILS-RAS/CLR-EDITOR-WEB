import { Component, Inject, Input } from '@angular/core';
import { ChunkModel, IndexModel } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-chunk-editor',
  templateUrl: './text-chunk-editor.component.html',
  styleUrl: './text-chunk-editor.component.scss',
})
export class TextChunkEditorComponent {
  @Input() index?: IndexModel;
  isDisabled: boolean = true;
  label: any;
  formControl = new FormControl([Validators.required]);
  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<TextChunkEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChunkModel
  ) {}

  Save() {
    this.projectService.SaveChunk()
  }
  Cancel() {
    this.dialogRef.close();
  }
}
