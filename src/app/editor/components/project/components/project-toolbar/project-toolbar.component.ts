import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { MatDialog } from '@angular/material/dialog';
import { TextHeaderEditorComponent } from '../text-header-editor/text-header-editor.component';
import { ProjectService } from '../../services/project.service';
import { HeaderModel } from '../../../../models';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { UiService } from '../../../../../services/ui.service';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent extends BaseComponent implements OnInit {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  header?: HeaderModel;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private uiService: UiService
  ) {
    super();
  }
  ngOnInit(): void {
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((item) => {
      this.header = item;
    });
  }

  DeleteHeader() {
    this.dialog
      .open(ConfirmComponent, { width:'600px', data: this.header?.desc })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.header) {
          this.projectService.MarkHeaderAsDeleted(this.header).then(() => {
            if (this.header?.projectId) {
              this.projectService.GetHeaders(this.header.projectId);
              this.projectService.$currentHeader.next(undefined);
              this.projectService.$currentIndeces.next(undefined);
              this.uiService.$indexPanelOpened.next(false);
            }
          });
        }
      });
  }
  EditHeader() {
    this.dialog.open(TextHeaderEditorComponent, {
      width: '600px',
      data: this.header,
    });
  }
  AddHeader() {
    this.dialog.open(TextHeaderEditorComponent, {
      width: '600px',
      data: new HeaderModel({}),
    });
  }

  Close() {
    this.onClose.emit();
  }
}
