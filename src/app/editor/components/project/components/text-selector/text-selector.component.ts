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

  }
  ngOnInit(): void {
    this.projectService.GetHeaders(this.project?._id).then(items =>{
      this.headers = items;
    });
  }

  Change() {
    this.projectService.$currentHeader.next(this.selected.value as HeaderModel);
  }
}
