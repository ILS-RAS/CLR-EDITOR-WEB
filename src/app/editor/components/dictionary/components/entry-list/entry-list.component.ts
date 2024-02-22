import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DictionaryService } from '../../services/dictionary.service';
import { MorphModel } from '../../../../models/morphModel';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss'
})
export class EntryListComponent extends BaseComponent implements OnInit {

  entries: MorphModel[] = [];

  constructor(private dictionaruService: DictionaryService){
    super();
  }
  ngOnInit(): void {
    this.dictionaruService.$entries.subscribe(items=>{
      if(items){
        this.entries = items.sort((a, b) => a.lemma!.localeCompare(b.lemma!));
      }
    })
  }

  Select(lemma: MorphModel) {
    this.dictionaruService.$currentEntry.next(lemma);
  }

}
