import {
  Component,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import {
  ChunkValueItemModel,
  HeaderModel,
  IndexModel,
} from '../../../../models';

import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { UiService } from '../../../../../services/ui.service';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MorphModel } from '../../../../models/morphModel';
@Component({
  selector: 'app-text-chunk',
  templateUrl: './text-chunk.component.html',
  styleUrl: './text-chunk.component.scss',
  providers: [DialogService, ConfirmationService, MessageService]
})
export class TextChunkComponent extends BaseComponent implements OnInit, OnDestroy {
  currentDef?: MorphModel;

  header?: HeaderModel;
  chunk?: ChunkViewModel;
  versions?: ChunkViewModel[];
  index?: IndexModel;
  chunkText = new FormControl([Validators.required]);
  editorForm: UntypedFormGroup;
  currentForm?: ChunkValueItemModel;
  isSelected: boolean = false;
  first: boolean = false;
  last: boolean = false;
  canCreate: boolean = false;
  items: MenuItem[] = [];
  public progressBarIsOn?: boolean;
  ref: DynamicDialogRef | undefined;
  constructor(
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private uiService: UiService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {
    super();

    this.editorForm = this.formBuilder.group({
      chunkText: new UntypedFormControl(''),
      chunkTextNew: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.uiService.$progressBarIsOn.pipe(takeUntil(this.destroyed)).subscribe(state=>{
      this.progressBarIsOn = state;
    });
    this.items = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (event) => this.EditChunk(),
      },
      {
        label: 'Create',
        icon: 'pi pi-pencil',
        command: (event) => this.CreateChunk(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: (event) => this.DeleteChunk(),
      },
    ];
    this.projectService.$currentHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((header) => {
        this.header = header;
      });

    this.projectService.$currentIndex
      .pipe(takeUntil(this.destroyed))
      .subscribe((item) => {
        this.uiService.$progressBarIsOn.next(true);
        if (item) {
          this.index = item;
        }
      });

    this.projectService.$currentChunk
      .pipe(takeUntil(this.destroyed))
      .subscribe((item) => {
        this.chunk = item;
        this.canCreate = true;
        if (this.chunk) {
          this.chunk.elements = JSON.parse(item?.valueObj as string);
          this.canCreate = false;
        }
        this.items[0].visible = !this.canCreate;
        this.items[1].visible = this.canCreate;
        this.items[2].visible = !this.canCreate;
        this.uiService.$progressBarIsOn.next(false);
      });

    this.projectService.$selectedDefinition.pipe(takeUntil(this.destroyed))
    .subscribe((def) => {
      this.currentDef = def;
    })

    this.projectService.$currentVersionChunks
      .pipe(takeUntil(this.destroyed))
      .subscribe((versions) => {
        this.versions = versions;
        if (this.versions) {
          this.uiService.$progressBarIsOn.next(true);
          this.versions.forEach((version) => {
            version.elements = JSON.parse(version.valueObj as string);
          });
          this.uiService.$progressBarIsOn.next(false);
        }
      });

    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        this.currentForm = form;
      });

    this.projectService.$currentIndexListPosition
    .pipe(takeUntil(this.destroyed))
    .subscribe((position) => {
      this.first = position === 0 ? true : false;
      this.last = position! + 1 === this.projectService.$currentIndeces.value?.length ? true : false;
    })
  }

  DeleteChunk() {
    let chunk = this.projectService.$currentChunk.value;
    if (chunk) {
      this.confirmationService.confirm({
        key: 'chunk-delete',
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          if (chunk) {
            this.uiService.$progressBarIsOn.next(true);
            this.projectService
              .DeleteChunk(chunk)
              .then(() => {
                this.projectService.$currentChunk.next(undefined);
              })
              .finally(() => {
                this.uiService.$progressBarIsOn.next(false);
                if(chunk){
                  this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `Text ${chunk.indexName} deleted`});
                }
              });
          }
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
      });
    }
  }

  EditChunk() {
    this.ref = this.dialogService.open(TextChunkEditorComponent, { 
      data: this.chunk,
      header: 'Fragmentum'
  });
  }

  CreateChunk() {
    let inx = this.projectService.$currentIndex.value;
    if(inx && inx._id){
      this.ref = this.dialogService.open(TextChunkEditorComponent, {
        header: 'Chunk creation',
        width: '600px',
        data: {
          chunk: new ChunkViewModel({ indexId: inx._id})
        }
      });
    }
  }

  toNext(){
    this.projectService.GetNextIndex();
  }

  toPrev() {
    this.projectService.GetPrevIndex();
  }

  OnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
