import { Component, Input, OnInit } from '@angular/core';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import { ChunkValueItemModel } from '../../../../models/chunkValueItemModel';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-text-chunk-element',
  templateUrl: './text-chunk-element.component.html',
  styleUrl: './text-chunk-element.component.scss'
})
export class TextChunkElementComponent extends BaseComponent implements OnInit {

  isMorphStyle: boolean = false;
  isNotMorphStyle: boolean = false;
  isSelected: boolean = false;
  isCommented: boolean = false;

  @Input() chunk?: ChunkViewModel;
  @Input() element: any;

  selectForm(orm: ChunkValueItemModel) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== undefined;
      this.isNotMorphStyle = this.element.morphId == undefined;
    }
  }
}
