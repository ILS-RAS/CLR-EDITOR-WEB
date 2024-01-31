import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ChunkModel, ChunkViewModel, IndexModel } from '../../../../models';
import { ActionService } from '../../services/action.service';
import { UiService } from '../../../../../services/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-toolbar',
  templateUrl: './text-toolbar.component.html',
  styleUrl: './text-toolbar.component.scss',
})
export class TextToolbarComponent extends BaseComponent implements OnInit {
  toggleIcon: string = 'left_panel_open';
  toggleLabel: string = 'Interpretatio';
  index?: IndexModel;
  isChecked = false;
  isToggled = false;
  chunk?: ChunkModel;
  constructor(
    private projectService: ProjectService,
    private uiService: UiService,
    public dialog: MatDialog
  ) {
    super();
    this.projectService.$currentIndex.subscribe((item) => {
      this.index = item;
    });
  }

  Click() {
    this.uiService.$indexPanelOpened.next(
      !this.uiService.$indexPanelOpened.value
    );

    this.toggleIcon =
      this.toggleIcon == 'left_panel_open'
        ? 'left_panel_close'
        : 'left_panel_open';
  }

  ngOnInit(): void {
    this.projectService.$showVersion.pipe(takeUntil(this.destroyed)).subscribe((item) => {
      this.isChecked = item;
    });
    this.projectService.$currentChunk.pipe(takeUntil(this.destroyed)).subscribe((item) => {
      this.chunk = item;
    });
  }

  DeleteChunk() {
    let chunk = this.projectService.$currentChunk.value;
    this.dialog
      .open(ConfirmComponent, { data: chunk?.value })
      .afterClosed()
      .subscribe((res) => {
        if (res && chunk) {
          this.projectService.DeleteChunk(chunk).then(() => {
            this.projectService.$currentChunk.next(undefined);
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

  CreateChunk() {
    this.dialog.open(TextChunkEditorComponent, {
      width: '600px',
      data: new ChunkViewModel({}),
    });
  }

  Change() {
    this.projectService.$showVersion.next(this.isChecked);
    if (this.isChecked == false) {
      this.projectService.$currentVersionChunks.next(undefined);
    } else {
      if (this.projectService.$currentChunk.value) {
        this.projectService.GetVersionChunks(
          this.projectService.$currentChunk.value._id as string,
          this.projectService.$currentChunk.value.headerLang == 'lat'
        );
      }
    }
  }
}
