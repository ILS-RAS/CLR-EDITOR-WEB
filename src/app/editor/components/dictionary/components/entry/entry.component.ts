import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { DictionaryService } from '../../services/dictionary.service';
import { EntryElementModel } from '../../../../models/entryElementModel';
import { EntryModel } from '../../../../models';
import { ElementType } from '../../../../enums/elementType';
import { EntryElementType } from '../../../../enums';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent extends BaseComponent implements OnInit {
  entry?: EntryModel | undefined;
  elements?: EntryElementModel[] = [];
  constructor(private dictionaryService: DictionaryService) {
    super();
  }

  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe((entry) => {
      this.entry = entry;
      this.dictionaryService.GetEntryElements(entry?._id);
    });

    this.dictionaryService.$entryElements.subscribe(elements =>{
      this.elements = elements;
    });
  }

  createEntryCard() {

    let header = new EntryElementModel({
      entryId:  this.entry?._id,
      type: EntryElementType.header
    });

    let body = new EntryElementModel({
      entryId:  this.entry?._id,
      type: EntryElementType.body
    });

    let footer = new EntryElementModel({
      entryId:  this.entry?._id,
      type: EntryElementType.footer
    });

    let savedElements: EntryElementModel[] = [];

    this.dictionaryService.SaveEntryElement(header).then((header)=>{
      savedElements.push(header);
      this.dictionaryService.SaveEntryElement(body).then((body)=>{
        savedElements.push(body);
        this.dictionaryService.SaveEntryElement(footer).then((footer)=>{
          savedElements.push(footer);
        }).finally(()=>{          
          let e = new EntryModel({
            _id : this.entry?._id,
            entryObj: JSON.stringify(savedElements),
            morphId: this.entry?.morphId,
            projectId: this.entry?.projectId
          });
          this.dictionaryService.SaveEntry(e).finally(()=>{
            this.dictionaryService.GetEntryElements(e._id);
            this.dictionaryService.$currentEntry.next(e);
          });
        })
      })
    })
  }

  deleteEntryCard() {
    this.dictionaryService.DeleteEntryElements(this.entry?._id).finally(()=>{
      let e = new EntryModel({
        _id : this.entry?._id,
        entryObj: " ",
        morphId: this.entry?.morphId,
        projectId: this.entry?.projectId
      });
      this.dictionaryService.SaveEntry(e).finally(()=>{
        this.dictionaryService.GetEntryElements(e._id);
        this.dictionaryService.$currentEntry.next(e);
      });
    })
  }
}
