import { Component, Input } from '@angular/core';
import { EntryElementModel } from '../../../../../models/entryElementModel';
import { BaseComponent } from '../../../../../../components/base/base/base.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;
}
