import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { ChunkModel, ChunkViewModel } from '../../../../models';
import { Helper } from '../../../../../utils';
import { ChunkParserService } from '../../services/chunk-parser.service';

@Component({
  selector: 'app-text-chunk-editor',
  templateUrl: './text-chunk-editor.component.html',
  styleUrl: './text-chunk-editor.component.scss',
})
export class TextChunkEditorComponent implements OnInit {
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<TextChunkEditorComponent>,
    private projectService: ProjectService,
    private chunkParser: ChunkParserService,
    @Inject(MAT_DIALOG_DATA) public chunk: ChunkViewModel,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      chunkInput: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.form.controls['chunkInput'].setValue(this.chunk.value);
    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Save() {

    if(!this.chunk._id){
      this.chunk.created = new Date().toISOString();
    }

    this.chunk.updated = new Date().toISOString();

    this.chunk.headerId = this.projectService.$currentHeader.value?._id;

    this.chunk.indexId = this.projectService.$currentIndex.value?._id;

    this.chunk.value = this.form.controls['chunkInput'].value;

    this.chunkParser.ParseTextToElements(this.chunk).then(items=>{

      this.chunk.valueObj = JSON.stringify(items);

    })
    //TODO:Save chunk
    // this.projectService.SaveChunk(this.chunk).then(item=>{
    //   let savedChunk = item as ChunkViewModel;
    //   if(savedChunk){
    //     this.projectService.$currentChunk.next(savedChunk);
    //   }
    // })
    
    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }
}
