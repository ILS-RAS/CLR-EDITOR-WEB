import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrl: './user-toolbar.component.scss',
})
export class UserToolbarComponent extends BaseComponent {
CreateUser() {
throw new Error('Method not implemented.');
}
  
  @Output() AssignProject: EventEmitter<void> = new EventEmitter<void>();
  @Output() EditUser: EventEmitter<void> = new EventEmitter<void>();

  onAssignProject() {
    this.AssignProject.emit();
  }

  onEditUser() {
    this.EditUser.emit();
  }
}
