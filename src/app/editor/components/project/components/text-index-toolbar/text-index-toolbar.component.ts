import { Component, Input } from '@angular/core';
import { IndexModel } from '../../../../models';

@Component({
  selector: 'app-text-index-toolbar',
  templateUrl: './text-index-toolbar.component.html',
  styleUrl: './text-index-toolbar.component.scss',
})
export class TextIndexToolbarComponent {

  @Input() index?:IndexModel;

  DeleteIndex() {
    throw new Error('Method not implemented.');
  }
  EditTextIndex() {
    throw new Error('Method not implemented.');
  }
  AddTextIndex() {
    throw new Error('Method not implemented.');
  }
}
