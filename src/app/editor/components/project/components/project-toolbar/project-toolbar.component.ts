import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { MatDialog } from '@angular/material/dialog';
import { TextHeaderEditorComponent } from '../text-header-editor/text-header-editor.component';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  constructor(public dialog: MatDialog) {}
  
  DeleteText() {
    throw new Error('Method not implemented.');
  }
  EditTextHeader() {
    this.dialog.open(TextHeaderEditorComponent);
  }
  AddTextHeader() {
    this.dialog.open(TextHeaderEditorComponent);
  }

  Close() {
    this.onClose.emit();
  }
}
