import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DictionaryService } from '../../services/dictionary.service';
import { EntryElementModel } from '../../../../models/entryElementModel';
import { EntryElementType } from '../../../../enums';
import { EntryModel, EntryViewModel } from '../../../../models';
import { MatDialog } from '@angular/material/dialog';
import { EntryElementEditorComponent } from '../entry-element-editor/entry-element-editor.component';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrl: './entry-card.component.scss',
})
export class EntryCardComponent extends BaseComponent implements OnInit {
  elements?: EntryElementModel[] = [];
  entry?: EntryViewModel;
  header?: EntryElementModel;
  body?: EntryElementModel;
  footer?: EntryElementModel;
  constructor(private dictionaryService: DictionaryService, private dialog: MatDialog) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe((entry) => {
      this.entry = entry;
      if(this.entry?.entryObj?.trim()){
        let elems = JSON.parse(this.entry?.entryObj) as EntryElementModel[];
        this.header = elems.find((i) => i.type == EntryElementType.header);
        this.body = elems.find((i) => i.type == EntryElementType.body);
        this.footer = elems.find((i) => i.type == EntryElementType.footer);
        this.elements?.push(... elems);
      }else{
        this.header = this.footer = this.body = undefined;
      }
    });
  }

  addFooterElement() {
    this.dialog.open(EntryElementEditorComponent, {width: '600px'});
  }
  addBodyElement() {
    this.dialog.open(EntryElementEditorComponent, {width: '600px'});
  }
  addHeaderElement() {
    this.dialog.open(EntryElementEditorComponent, {width: '600px'}).afterClosed().subscribe(result=>{
      if(result){
        let e = new EntryElementModel({
          entryId: this.entry?._id,
          parentId: this.header?._id,
          value:this.entry?._id,
          type:EntryElementType.lemma
        });
        this.dictionaryService.SaveEntryElement(e).then((element: EntryElementModel)=>{
          this.elements?.push(element);
          let e = new EntryModel({
            _id : this.entry?._id,
            entryObj: JSON.stringify(this.elements),
            morphId: this.entry?.morphId,
            projectId: this.entry?.projectId
          });
          this.dictionaryService.SaveEntry(e).finally(()=>{
            this.dictionaryService.GetEntryElements(e._id);
            this.dictionaryService.$currentEntry.next(e);
          })
        })
      }
    })
  }
}
