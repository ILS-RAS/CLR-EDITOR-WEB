import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-word-list-item',
  templateUrl: './word-list-item.component.html',
  styleUrl: './word-list-item.component.scss'
})
export class WordListItemComponent extends BaseComponent implements OnInit {

  @Input() lemma?: MorphModel;
  items?: MorphModel[];
  constructor(private dictionaryService: DictionaryService){
    super();

  }

  Opened() {
    if(this.lemma && this.lemma.form){
     this.dictionaryService.GetLemmaItems(this.lemma?.form).then(items=>{
      this.items = items;
     })
    }
    
  }

  ngOnInit(): void {
    
  }
}
