import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HeaderModel } from '../../../../models/headerModel';
import { ProjectModel } from '../../../../models/projectModel';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-selector',
  templateUrl: './text-selector.component.html',
  styleUrl: './text-selector.component.scss'
})
export class TextSelectorComponent extends BaseComponent implements OnInit {
  
  form: UntypedFormGroup;

  @Input() project?: ProjectModel;
  @Input() header?: HeaderModel;

  label?: string = 'Textus';

  headers: HeaderModel[] = [];

  constructor(private projectService: ProjectService, private formBuilder: UntypedFormBuilder) {
    super();
    this.form = this.formBuilder.group({
      headerSelect: new UntypedFormControl()
    });
    this.projectService.$projectHeaders.pipe(takeUntil(this.destroyed)).subscribe((headers)=>{
      if(headers){
        this.headers = headers;
      }
    });
  }
  
  ngOnInit(): void {

    if(this.project && this.project._id){
      this.projectService.GetHeaders(this.project._id);
    }

    this.form.controls['headerSelect'].setValue(this.header?.code);
  }

  Change() {

    this.projectService.$currentHeader.next(this.headers.find(i=>i.code == this.form.controls['headerSelect'].value));

    this.projectService.$currentIndex.next(undefined);
    this.projectService.$currentChunk.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
  }
}
