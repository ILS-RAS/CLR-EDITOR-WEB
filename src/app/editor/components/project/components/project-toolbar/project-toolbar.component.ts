import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { MatDialog } from '@angular/material/dialog';
import { TextHeaderEditorComponent } from '../text-header-editor/text-header-editor.component';
import { ProjectService } from '../../services/project.service';
import { HeaderModel } from '../../../../models';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent implements OnInit {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  header?: HeaderModel;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.projectService.$currentHeader.subscribe((item) => {
      this.header = item;
    });
  }

  DeleteProject() {
    this.dialog.open(ConfirmComponent, { width:'600px', data: this.header?.code })
    .afterClosed()
    .subscribe((res)=>{
      if(res && this.project){
        this.projectService.MarkProjectDeleted(this.project).then(()=>{
          this.Close();
        })
      }
    })
  }

  DeleteText() {
    this.dialog
      .open(ConfirmComponent, { width:'600px', data: this.header?.desc })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.header) {
          this.projectService.MarkHeaderAsDeleted(this.header).then(() => {
            if (this.header?.projectId) {
              this.projectService.GetHeaders(this.header.projectId);
            }
          });
        }
      });
  }
  EditTextHeader() {
    this.dialog.open(TextHeaderEditorComponent, {
      width: '600px',
      data: this.header,
    });
  }
  AddTextHeader() {
    this.dialog.open(TextHeaderEditorComponent, {
      width: '600px',
      data: new HeaderModel({}),
    });
  }

  Close() {
    this.onClose.emit();
  }
}
