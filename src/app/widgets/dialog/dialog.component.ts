import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() title?: string;
  @Input() disabled: boolean = false;
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  visible: boolean = true;

  showDialog() {
    this.visible = true;
  }
  Cancel() {
    this.onCancel.emit();
  }
  Save() {
    this.onSave.emit();
  }
}
