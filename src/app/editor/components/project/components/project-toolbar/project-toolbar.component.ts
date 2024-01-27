import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent {
DeleteText() {
throw new Error('Method not implemented.');
}
EditTextHeader() {
throw new Error('Method not implemented.');
}
AddTextHeader() {
throw new Error('Method not implemented.');
}
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  Close() {
    this.onClose.emit();
  }
}
