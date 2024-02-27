import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { LemmaSelectorComponent } from '../lemma-selector/lemma-selector.component';

@Component({
  selector: 'app-entry-list-toolbar',
  templateUrl: './entry-list-toolbar.component.html',
  styleUrl: './entry-list-toolbar.component.scss'
})
export class EntryListToolbarComponent extends BaseComponent {
  constructor(private dialog: MatDialog){
    super();

  }
  AddLemma(){
    this.dialog.open(LemmaSelectorComponent, {width: '600px'});
  }
}
