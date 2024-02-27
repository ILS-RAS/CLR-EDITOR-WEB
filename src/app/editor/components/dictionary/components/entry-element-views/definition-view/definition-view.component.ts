import { Component, Input } from '@angular/core';
import { EntryElementModel } from '../../../../../models/entryElementModel';
import { BaseComponent } from '../../../../../../components/base/base/base.component';

@Component({
  selector: 'app-definition-view',
  templateUrl: './definition-view.component.html',
  styleUrl: './definition-view.component.scss'
})
export class DefinitionViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;
}
