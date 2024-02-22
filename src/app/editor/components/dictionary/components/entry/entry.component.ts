import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent extends BaseComponent implements OnInit {
  lemma?: MorphModel;
  constructor(private dictionaryService: DictionaryService) {
    super();
  }

  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe(lemma=>{
      this.lemma = lemma;
    })
  }
}
