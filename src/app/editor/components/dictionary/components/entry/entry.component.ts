import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';
import { EntryElementModel } from '../../../../models/entryElementModel';
import { EntryModel } from '../../../../models';
import { ElementType } from '../../../../enums/elementType';
import { EntryElementType } from '../../../../enums';
import { Helper } from '../../../../../utils';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent extends BaseComponent implements OnInit {
  entry?: EntryModel | undefined;
  constructor(private dictionaryService: DictionaryService) {
    super();
  }

  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe((entry) => {
      this.entry = entry;
    });
  }
}
