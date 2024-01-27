import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text-toolbar',
  templateUrl: './text-toolbar.component.html',
  styleUrl: './text-toolbar.component.scss'
})
export class TextToolbarComponent {
  @Output() onToggleIndex: EventEmitter<void> = new EventEmitter();
  toggleIcon: string = "left_panel_open";

  Click() {
    this.onToggleIndex.emit();
    this.toggleIcon = this.toggleIcon == "left_panel_open" ? "left_panel_close" : "left_panel_open";
  }
}
