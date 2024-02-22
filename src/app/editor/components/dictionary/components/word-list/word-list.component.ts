import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DictionaryService } from '../../services/dictionary.service';
import { MorphModel } from '../../../../models/morphModel';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.scss'
})
export class WordListComponent extends BaseComponent implements OnInit {

  lemmata: MorphModel[] = [];

  constructor(private dictionaruService: DictionaryService){
    super();
  }
  ngOnInit(): void {
    this.dictionaruService.$entries.subscribe(items=>{
      if(items){
        this.lemmata = items.sort((a, b) => a.lemma!.localeCompare(b.lemma!));
      }
    })
  }

  Select(lemma: MorphModel) {
    this.dictionaruService.$currentEntry.next(lemma);
  }

}
