import { AfterContentInit, AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import { ChunkValueItemModel, IndexModel } from '../../../../models';
import { ActionService } from '../../services/action.service';
import { Action } from '../../../../enums';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { UiService } from '../../../../../services/ui.service';


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
  currentForm?: ChunkValueItemModel;
  isSelected: boolean = false;
  constructor(private projectService: ProjectService, private formBuilder: UntypedFormBuilder, private uiService: UiService) {
    super();
    
    this.editorForm = this.formBuilder.group({
      chunkText: new UntypedFormControl(''),
      chunkTextNew: new UntypedFormControl('')
    });
  }

  ngOnInit(): void {

    this.projectService.$currentIndex.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.uiService.$progressBarIsOn.next(true);
      if(item){
        this.index = item;
      }
    })

    this.projectService.$currentChunk.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.chunk = item;
      if(this.chunk){
        this.chunk.elements = JSON.parse(item?.valueObj as string);
      }
      this.uiService.$progressBarIsOn.next(false);
    });

    this.projectService.$currentVersionChunks.pipe(takeUntil(this.destroyed)).subscribe(versions=>{
      this.versions = versions;
      if(this.versions){
        this.uiService.$progressBarIsOn.next(true);
        this.versions.forEach(version=>{
          version.elements = JSON.parse(version.valueObj as string);
        });
        this.uiService.$progressBarIsOn.next(false);
      }
    });

    this.projectService.$currentForm.pipe(takeUntil(this.destroyed)).subscribe(form=>{
      this.currentForm = form;
    });
  }

}
