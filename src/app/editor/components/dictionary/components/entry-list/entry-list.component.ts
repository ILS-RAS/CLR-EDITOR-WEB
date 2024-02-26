import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DictionaryService } from '../../services/dictionary.service';
import { MorphModel } from '../../../../models/morphModel';
import { EntryModel } from '../../../../models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss'
})
export class EntryListComponent extends BaseComponent implements OnInit {

  entries: MorphModel[] = [];

  constructor(private dictionaryService: DictionaryService, private dialog: MatDialog){
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$entries.subscribe(items=>{
      if(items){
        this.entries = items.sort((a, b) => a.lemma!.localeCompare(b.lemma!));
      }
    })
  }

  select(entry: EntryModel) {
    this.dictionaryService.$currentEntry.next(entry);
  }

  deleteEntry(entry: EntryModel) {
    this.dialog.open(ConfirmComponent).afterClosed().subscribe(result=>{
      if(result){
        this.dictionaryService.DeleteEntry(entry).then(()=>{
          this.dictionaryService.getEntries(this.dictionaryService.$currentDictionary.value?._id);
        });
      }
    })
  }
}
