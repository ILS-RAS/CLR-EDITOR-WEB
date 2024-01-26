import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  Close() {
    this.onClose.emit();
  }
}
