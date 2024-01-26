import { Component, Input } from '@angular/core';
import { HeaderModel } from '../../../../models';

@Component({
  selector: 'app-text-index-toolbar',
  templateUrl: './text-index-toolbar.component.html',
  styleUrl: './text-index-toolbar.component.scss'
})
export class TextIndexToolbarComponent {
  @Input() header?: HeaderModel;
}
