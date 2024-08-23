import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ChunkModel, ChunkViewModel, InterpModel } from '../../../../models';
import { Helper } from '../../../../../utils';
import { ChunkParserService } from '../../services/chunk-parser.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { UiService } from '../../../../../services/ui.service';
import { ChunkStatus, EditionType } from '../../../../enums';
import { ChunkQuery } from '../../../../queries';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-text-chunk-editor',
  templateUrl: './text-chunk-editor.component.html',
  styleUrl: './text-chunk-editor.component.scss',
})
export class TextChunkEditorComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  visible: boolean = true;
  title: string = 'Fragmentum';
  chunk: ChunkViewModel;
  constructor(
    private projectService: ProjectService,
    private chunkParser: ChunkParserService,
    private formBuilder: UntypedFormBuilder,
    private uiService: UiService,
    public ref: DynamicDialogRef,
    public refconf: DynamicDialogConfig
  ) {
    super();
    this.form = this.formBuilder.group({
      chunkInput: new UntypedFormControl(''),
    });
    this.chunk = refconf.data;
  }

  ngOnInit(): void {
    if (this.chunk) {
      this.form.controls['chunkInput'].setValue(this.chunk.value);
    }
    this.form.statusChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => (this.isDisabled = !Helper.IsFormValid(val)));
  }

  Save() {
    this.uiService.$progressBarIsOn.next(true);

    if (!this.chunk._id) {
      this.chunk.created = new Date().toISOString();
    }

    this.chunk.updated = new Date().toISOString();

    this.chunk.headerId = this.projectService.$currentHeader.value?._id;

    this.chunk.indexId = this.projectService.$currentIndex.value?._id;

    this.chunk.value = this.form.controls['chunkInput'].value;

    this.chunk.status = ChunkStatus.Published;

    let clearChunk = new ChunkModel({
      _id: this.chunk._id,
      created: this.chunk.created,
      headerId: this.chunk.headerId,
      indexId: this.chunk.indexId,
      status: this.chunk.status,
      updated: this.chunk.created,
      value: this.chunk.value,
    });

    this.projectService
      .SaveChunk(clearChunk)
      .then((savedChunk) => {
        let sch = savedChunk as ChunkModel;
        if (sch.indexId) {
          if (
            this.projectService.$currentHeader.value &&
            this.projectService.$currentHeader.value.editionType ==
              EditionType.Interpretation
          ) {
            this.projectService
              .GetChunkByQuery(
                new ChunkQuery({
                  indexName: this.projectService.$currentIndex.value?.name,
                  headerId: this.projectService.$projectHeaders.value?.find(
                    (i) => i.editionType == EditionType.Original
                  )?._id,
                })
              )
              .then((result) => {
                if (result) {
                  let interpModel = new InterpModel({
                    sourceId: result[0]._id,
                    sourceHeaderId: result[0].headerId,
                    interpId: sch._id,
                    interpHeaderId: sch.headerId,
                  });
                  this.projectService.SaveInterpLink(interpModel);
                }
              });
          }
          this.projectService.GetChunk(sch.indexId);
        }
      })
      .finally(() => {
        this.uiService.$progressBarIsOn.next(false);
        this.ref.close();
      });
  }

  Cancel() {
    throw new Error('Method not implemented.');
  }
}
