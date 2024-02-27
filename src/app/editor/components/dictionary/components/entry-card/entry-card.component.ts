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
  headerElements?: EntryElementModel[] = [];
  entry?: EntryViewModel;
  header?: EntryElementModel;
  body?: EntryElementModel;
  bodyElements?: EntryElementModel[] = [];
  footer?: EntryElementModel;
  footerElements?: EntryElementModel[] = [];
  constructor(
    private dictionaryService: DictionaryService,
    private dialog: MatDialog
  ) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$currentEntry.subscribe((entry) => {
      this.entry = entry;
      if (this.entry?.entryObj?.trim()) {
        this.elements = JSON.parse(this.entry?.entryObj) as EntryElementModel[];
        this.header = this.elements.find((i) => i.type == 'header');
        this.headerElements = this.elements.filter(
          (e) => e.parentId == this.header?._id
        );
        this.body = this.elements.find((i) => i.type == 'body');
        this.bodyElements = this.elements.filter(
          (i) => i.parentId == this.body?._id
        );
        this.footer = this.elements.find((i) => i.type == 'footer');
        this.footerElements = this.elements.filter(
          (i) => i.parentId == this.footer?._id
        );
      } else {
        this.header = this.footer = this.body = undefined;
      }
    });
  }

  addChildElement(parentElement: EntryElementModel) {
    this.dialog
      .open(EntryElementEditorComponent, { width: '600px', data: parentElement })
      .afterClosed()
      .subscribe((element) => {
        if (element) {
          this.dictionaryService.updateElements(element);
        }
      });
  }
}
