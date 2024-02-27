import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UiService } from '../../../../../services/ui.service';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-entry-toolbar',
  templateUrl: './entry-toolbar.component.html',
  styleUrl: './entry-toolbar.component.scss',
})
export class EntryToolbarComponent extends BaseComponent implements OnInit {
  toggleIcon: string = 'left_panel_open';
  entry?: MorphModel;
  constructor(private uiService: UiService, private dictionaryService: DictionaryService) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe(entry => {
      this.entry = entry;
    })
  }
  Click() {
    this.uiService.$entryPanelOpened.next(
      !this.uiService.$entryPanelOpened.value
    );

    this.toggleIcon =
      this.toggleIcon == 'left_panel_open'
        ? 'left_panel_close'
        : 'left_panel_open';
  }
}
