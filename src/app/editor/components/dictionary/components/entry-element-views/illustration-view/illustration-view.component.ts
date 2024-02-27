import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementModel } from '../../../../../models/entryElementModel';

@Component({
  selector: 'app-illustration-view',
  templateUrl: './illustration-view.component.html',
  styleUrl: './illustration-view.component.scss'
})
export class IllustrationViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;
}
