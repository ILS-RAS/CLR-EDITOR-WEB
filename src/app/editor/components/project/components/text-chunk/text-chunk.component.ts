import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkViewModel } from '../../../../models/chunkViewModel';
import {
  ChunkValueItemModel,
  HeaderModel,
  IndexModel,
} from '../../../../models';
import { ActionService } from '../../services/action.service';
import { Action } from '../../../../enums';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';

@Component({
  selector: 'app-text-chunk',
  templateUrl: './text-chunk.component.html',
  styleUrl: './text-chunk.component.scss',
})
export class TextChunkComponent extends BaseComponent implements OnInit {
  header?: HeaderModel;
  chunk?: ChunkViewModel;
  versions?: ChunkViewModel[];
  index?: IndexModel;
  chunkText = new FormControl([Validators.required]);
  editorForm: UntypedFormGroup;
  currentForm?: ChunkValueItemModel;
  isSelected: boolean = false;
  items: MenuItem[] = [];
  public progressBarIsOn?: boolean;

  constructor(
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private uiService: UiService,
    public dialog: MatDialog
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
        if (this.chunk) {
          this.chunk.elements = JSON.parse(item?.valueObj as string);
        }
        this.uiService.$progressBarIsOn.next(false);
      });

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
  }

  DeleteChunk() {
    let chunk = this.projectService.$currentChunk.value;
    this.dialog
      .open(ConfirmComponent, { data: chunk?.value })
      .afterClosed()
      .subscribe((res) => {
        if (res && chunk) {
          this.uiService.$progressBarIsOn.next(true);
          this.projectService
            .DeleteChunk(chunk)
            .then(() => {
              this.projectService.$currentChunk.next(undefined);
            })
            .finally(() => {
              this.uiService.$progressBarIsOn.next(false);
            });
        }
      });
  }

  EditChunk() {
    this.dialog.open(TextChunkEditorComponent, {
      width: '600px',
      data: this.chunk,
    });
  }

}
