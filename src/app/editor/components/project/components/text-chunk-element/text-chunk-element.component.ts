import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import { ChunkValueItemModel } from '../../../../models/chunkValueItemModel';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-chunk-element',
  templateUrl: './text-chunk-element.component.html',
  styleUrl: './text-chunk-element.component.scss'
})
export class TextChunkElementComponent extends BaseComponent implements OnInit {

  isMorphStyle: boolean = false;
  isNotMorphStyle: boolean = false;
  isCommented: boolean = false;

  @Input() chunk?: ChunkViewModel;
  @Input() element: any;
  @Input() isSelected: boolean = false;
  
  constructor(private projectService: ProjectService){
    super()
  }

  selectForm(form: ChunkValueItemModel) {
    this.projectService.$currentForm.next(form);
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== undefined;
      this.isNotMorphStyle = this.element.morphId == undefined;
    }
  }
}
