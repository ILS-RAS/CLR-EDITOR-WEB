import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementModel } from '../../../../../models/entryElementModel';

@Component({
  selector: 'app-mark-view',
  templateUrl: './mark-view.component.html',
  styleUrl: './mark-view.component.scss'
})
export class MarkViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;
}
