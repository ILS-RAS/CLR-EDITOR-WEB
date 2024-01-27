import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormControl, Validators } from '@angular/forms';
import { HeaderModel } from '../../../../models/headerModel';
import { ProjectModel } from '../../../../models/projectModel';

@Component({
  selector: 'app-text-selector',
  templateUrl: './text-selector.component.html',
  styleUrl: './text-selector.component.scss'
})
export class TextSelectorComponent implements OnInit {
  
  @Input() project?: ProjectModel;

  label?: string = 'Textus';

  selected = new FormControl([Validators.required]);

  headers: HeaderModel[] = [];

  constructor(private projectService: ProjectService) {
    this.projectService.$projectHeaders.subscribe((headers)=>{
      if(headers){
        this.headers = headers;
      }
    });
  }
  
  ngOnInit(): void {
    if(this.project && this.project._id){
      this.projectService.GetHeaders(this.project._id);
    }
  }

  Change() {
    this.projectService.$currentHeader.next(this.selected.value as HeaderModel);
    this.projectService.$currentIndex.next(undefined);
    this.projectService.$currentChunk.next(undefined);
    this.projectService.$currentInterpChunks.next(undefined);
  }
}
