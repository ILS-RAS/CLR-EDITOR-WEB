import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DictionaryService } from '../../services/dictionary.service';
import { EntryElementModel } from '../../../../models/entryElementModel';
import { EntryElementType } from '../../../../enums';
import { EntryModel, EntryViewModel } from '../../../../models';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrl: './entry-card.component.scss'
})
export class EntryCardComponent extends BaseComponent implements OnInit {
  elements?: EntryElementModel[] = [];
  entry?: EntryViewModel;
  header?: EntryElementModel;
  body?: EntryElementModel;
  footer?: EntryElementModel;
  constructor(private dictionaryService: DictionaryService) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$entryElements.subscribe((elements) => {
      this.elements = elements;
      if (elements && elements.length > 0) {
        this.header = elements.find((i) => i.type == EntryElementType.header);
        this.body = elements.find((i) => i.type == EntryElementType.body);
        this.footer = elements.find((i) => i.type == EntryElementType.footer);
      }else{
        this.header = this.footer = this.body = undefined;
      }
    });
    this.dictionaryService.$currentEntry.subscribe(entry=>{
      this.entry = entry;
    })
  }
}
