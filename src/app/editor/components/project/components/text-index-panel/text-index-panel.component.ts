import { Component, Input } from '@angular/core';
import { HeaderModel } from '../../../../models';

@Component({
  selector: 'app-text-index-panel',
  templateUrl: './text-index-panel.component.html',
  styleUrl: './text-index-panel.component.scss'
})
export class TextIndexPanelComponent {
  @Input() header?: HeaderModel;
  
}
