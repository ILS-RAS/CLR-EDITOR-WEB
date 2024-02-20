import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UiService } from '../../../../../services/ui.service';

@Component({
  selector: 'app-entry-toolbar',
  templateUrl: './entry-toolbar.component.html',
  styleUrl: './entry-toolbar.component.scss'
})
export class EntryToolbarComponent extends BaseComponent {
AddHeader() {
throw new Error('Method not implemented.');
}
toggleIcon: string = 'left_panel_open';
constructor(private uiService: UiService){
  super();
}
Click() {
  this.uiService.$wordPanelOpened.next(
    !this.uiService.$wordPanelOpened.value
  );

  this.toggleIcon =
    this.toggleIcon == 'left_panel_open'
      ? 'left_panel_close'
      : 'left_panel_open';
}
AddDefinition() {
throw new Error('Method not implemented.');
}

}
