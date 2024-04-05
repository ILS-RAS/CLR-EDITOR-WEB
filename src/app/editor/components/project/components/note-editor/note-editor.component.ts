import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss'
})
export class NoteEditorComponent extends BaseComponent {
  constructor(){
    super();
  }
}
