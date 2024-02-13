import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { WordSelectorComponent } from '../word-selector/word-selector.component';

@Component({
  selector: 'app-word-list-toolbar',
  templateUrl: './word-list-toolbar.component.html',
  styleUrl: './word-list-toolbar.component.scss'
})
export class WordListToolbarComponent extends BaseComponent {
  constructor(private dialog: MatDialog){
    super();

  }
  AddLemma(){
    this.dialog.open(WordSelectorComponent, {width: '600px'});
  }
}
