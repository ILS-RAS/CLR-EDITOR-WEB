import { Component, Input } from '@angular/core';
import { IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-text-index-toolbar',
  templateUrl: './text-index-toolbar.component.html',
  styleUrl: './text-index-toolbar.component.scss',
})
export class TextIndexToolbarComponent extends BaseComponent {

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
