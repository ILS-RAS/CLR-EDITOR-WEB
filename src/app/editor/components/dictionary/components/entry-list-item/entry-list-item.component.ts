import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-entry-list-item',
  templateUrl: './entry-list-item.component.html',
  styleUrl: './entry-list-item.component.scss'
})
export class EntryListItemComponent extends BaseComponent implements OnChanges {

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
