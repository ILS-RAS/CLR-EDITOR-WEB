import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndexModel } from '../../../../models';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';
import { TextIndexItemEditorComponent } from '../text-index-item-editor/text-index-item-editor.component';

@Component({
  selector: 'app-text-index-item-toolbar',
  templateUrl: './text-index-item-toolbar.component.html',
  styleUrl: './text-index-item-toolbar.component.scss',
})
export class TextIndexItemToolbarComponent implements OnChanges {
  @Input() indexId?: string;

  index?: IndexModel;

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.indexId) {
      this.index = this.projectService.$currentIndeces.value?.find(
        (i) => i._id == this.indexId
      );
    }
  }

  ngOnInit(): void {}

  AddChunk() {
    this.dialog.open(TextChunkEditorComponent);
  }
  DeleteNode() {
    throw new Error('Method not implemented.');
  }
  EditNode() {
    this.dialog.open(TextIndexItemEditorComponent);
  }
  AddSubnodes() {
    throw new Error('Method not implemented.');
  }
}
