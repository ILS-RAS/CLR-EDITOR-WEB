import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementModel } from '../../../../../models/entryElementModel';

@Component({
  selector: 'app-lemma-view',
  templateUrl: './lemma-view.component.html',
  styleUrl: './lemma-view.component.scss'
})
export class LemmaViewComponent extends BaseComponent {
  @Input() element?: EntryElementModel;
}
