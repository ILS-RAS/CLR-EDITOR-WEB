import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChunkModel, IndexModel } from '../../../../models';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { TextIndexItemEditorComponent } from '../text-index-item-editor/text-index-item-editor.component';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { TextIndexBuilderComponent } from '../text-index-builder/text-index-builder.component';
import { takeUntil } from 'rxjs';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';

@Component({
  selector: 'app-text-index-item-toolbar',
  templateUrl: './text-index-item-toolbar.component.html',
  styleUrl: './text-index-item-toolbar.component.scss',
})
export class TextIndexItemToolbarComponent extends BaseComponent implements OnChanges {
  @Input() indexId?: string;

  index?: IndexModel;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.indexId) {
      this.index = this.projectService.$currentIndeces.value?.find(
        (i) => i._id == this.indexId
      );
    }
  }

  ngOnInit(): void {}

  DeleteIndex() {
    this.dialog.open(ConfirmComponent, { width: `600px`, hasBackdrop: true, data: this.index })
    .afterClosed()
    .subscribe((res)=>{
      if(res && this.index && this.index.headerId){
        this.projectService.DeleteIndex(this.index).then(()=>{
          if(this.index && this.index.headerId){
            this.projectService.GetIndeces(this.index.headerId);
          }
        })
      }
    })
  }

  EditIndexName() {
    this.dialog.open(TextIndexItemEditorComponent,  { width: `600px`, hasBackdrop: true, data: this.index  });
  }

  CreateChildIndex() {
    if(this.index && this.index._id){
      this.dialog
      .open(TextIndexBuilderComponent, {
        width: '600px',
        data: new IndexModel({parentId: this.index._id, headerId: this.index.headerId, name: this.index.name })
      });
    }

  }
}
