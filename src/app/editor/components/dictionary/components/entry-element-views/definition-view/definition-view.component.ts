import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntryElementModel } from '../../../../../models/entryElementModel';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { EntryElementEditorComponent } from '../../entry-element-editor/entry-element-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryService } from '../../../services/dictionary.service';

@Component({
  selector: 'app-definition-view',
  templateUrl: './definition-view.component.html',
  styleUrl: './definition-view.component.scss'
})
export class DefinitionViewComponent extends BaseComponent {

  @Input() element?: EntryElementModel;
  @Output() delete: EventEmitter<EntryElementModel> = new EventEmitter();
  constructor(private dialog: MatDialog, private dictionaryService: DictionaryService){
    super();
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

  removeElement(element: EntryElementModel) {
    this.delete.emit(element);
  }
}
