import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndexModel } from '../../../../models';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-index-item-toolbar',
  templateUrl: './text-index-item-toolbar.component.html',
  styleUrl: './text-index-item-toolbar.component.scss'
})
export class TextIndexItemToolbarComponent implements OnChanges {

  @Input()indexId?:string;

  index?: IndexModel;

  constructor(private projectService: ProjectService) {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.indexId){
      this.index = this.projectService.$currentIndeces.value?.find(i=>i._id == this.indexId);
    }
  }


  ngOnInit(): void {
    
  }
  
}
