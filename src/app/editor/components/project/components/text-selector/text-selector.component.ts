import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  label?: string = 'Textus';

  selected = new FormControl([Validators.required]);

  headers: HeaderModel[] = [];

  project?: ProjectModel;

  constructor(private projectService: ProjectService) {
    this.projectService.currentProject.subscribe((item) => {
      this.project = item;
    });
    this.projectService.headers.subscribe((headers) => {
      this.headers = headers;
    });
  }
  ngOnInit(): void {
    this.projectService.GetHeaders(this.project?._id);
  }

  Change() {
    
    
  }
}
