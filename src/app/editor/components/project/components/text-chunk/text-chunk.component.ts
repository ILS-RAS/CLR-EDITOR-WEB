import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import { IndexModel } from '../../../../models';
import { ActionService } from '../../services/action.service';
import { Action } from '../../../../enums';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-text-chunk',
  templateUrl: './text-chunk.component.html',
  styleUrl: './text-chunk.component.scss'
})
export class TextChunkComponent extends BaseComponent implements OnInit {

  chunk?: ChunkViewModel;
  versions?: ChunkViewModel[];
  index?: IndexModel;
  chunkText = new FormControl([Validators.required]);
  editorForm: UntypedFormGroup;
  constructor(private projectService: ProjectService, private formBuilder: UntypedFormBuilder) {
    super();
    
    this.editorForm = this.formBuilder.group({
      chunkText: new UntypedFormControl(''),
      chunkTextNew: new UntypedFormControl('')
    });
  }
  ngOnInit(): void {

    this.projectService.$currentIndex.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      if(item){
        this.index = item;
      }
    })

    this.projectService.$currentChunk.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.chunk = item;
      if(this.chunk){
        this.chunk.elements = JSON.parse(item?.valueObj as string);
      }
    });

    this.projectService.$currentVersionChunks.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.versions = item;
      if(this.versions){
        this.versions.forEach(version=>{
          version.elements = JSON.parse(version.valueObj as string);
        })
      }
    });
  }
}
