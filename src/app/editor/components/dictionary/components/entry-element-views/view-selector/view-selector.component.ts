import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementModel } from '../../../../../models/entryElementModel';
import { DictionaryService } from '../../../services/dictionary.service';
import { takeUntil } from 'rxjs';
import { EntryModel } from '../../../../../models';

@Component({
  selector: 'app-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrl: './view-selector.component.scss'
})
export class ViewSelectorComponent extends BaseComponent implements OnInit {

  @Input() elements?: EntryElementModel[] = [];
  entryElements?: EntryElementModel[] = [];
  constructor(private dictionaryService: DictionaryService){
    super();
  }

  ngOnInit(): void {
    this.dictionaryService.$currentEntry.pipe(takeUntil(this.destroyed)).subscribe(entry=>{
      if(entry && entry.entryObj){
        this.entryElements = JSON.parse(entry?.entryObj);
      }
    })
  }
  getChildren(parentEntry: EntryElementModel): EntryElementModel[] {
    
    let children = this.entryElements?.filter(i=>i.parentId == parentEntry._id) ? this.entryElements?.filter(i=>i.parentId == parentEntry._id) : [];

    return children;
  }

  delete(element: EntryElementModel) {
    this.elements = this.elements?.filter(i=>i._id !== element._id);
    let entry = this.dictionaryService.$currentEntry.value;
    if(entry){
      let e: EntryModel = new EntryModel({
        _id: entry?._id,
        entryObj: JSON.stringify(this.elements),
        morphId: entry?.morphId,
        parentId: entry?.parentId,
        projectId: entry?.projectId
      });
      this.dictionaryService.SaveEntry(e).then(saved=>{
        this.dictionaryService.$currentEntry.next(this.dictionaryService.$entries.value?.find(i=>i._id == saved._id));
      });
    }
  }
}
