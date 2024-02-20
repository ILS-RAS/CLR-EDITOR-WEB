import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-word-list-item',
  templateUrl: './word-list-item.component.html',
  styleUrl: './word-list-item.component.scss'
})
export class WordListItemComponent extends BaseComponent implements OnChanges {

  @Input() lemma?: MorphModel;
  items?: MorphModel[];
  constructor(private dictionaryService: DictionaryService){
    super();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.lemma && this.lemma.form){
      this.dictionaryService.GetLemmaItems(this.lemma?.form).then(items=>{
       this.items = items;
      })
     }
  }
}
