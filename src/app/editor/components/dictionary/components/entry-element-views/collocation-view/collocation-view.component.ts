import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementModel } from '../../../../../models/entryElementModel';

@Component({
  selector: 'app-collocation-view',
  templateUrl: './collocation-view.component.html',
  styleUrl: './collocation-view.component.scss'
})
export class CollocationViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;

}
