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
import { HeaderQuery } from '../../../../queries';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
})
export class ProjectToolbarComponent extends BaseComponent implements OnInit {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  header?: HeaderModel;
  items: MenuItem[] = [];
  selected?: HeaderModel;
  headers?: HeaderModel[];
  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private uiService: UiService
  ) {
    super();
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Add',
        icon: 'pi pi-plus',
        command: () => this.AddHeader(),
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.EditHeader(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.DeleteHeader(),
      },
      {
        separator: true
      },
      {
        label: 'Show Content',
        icon: 'pi pi-list',
        command: () => this.showContent()
      },
      {
        separator: true
      },
      {
        label: 'Close Project',
        icon: 'pi pi-times',
        command: () => this.Close()
      },
    ];
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((item) => {
      this.selected = this.header = item;
    });
    this.projectService.$projectHeaders.pipe(takeUntil(this.destroyed)).subscribe(headers=>{
      this.headers = headers;
    })

  }

  DeleteHeader() {
    this.dialog
      .open(ConfirmComponent, { width:'600px', data: this.header?.desc })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.header) {
          this.projectService.MarkHeaderAsDeleted(this.header).then(() => {
            if (this.header?.projectId) {
              this.projectService.GetHeadersByProjectId(this.header.projectId);
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

  Change(event: DropdownChangeEvent) {
    if(this.selected && this.selected?._id){
      this.projectService.$currentHeader.next(this.selected);
      this.projectService.GetIndeces(this.selected?._id);
      this.projectService.$currentForm.next(undefined);
      this.projectService.$currentIndex.next(undefined);
      this.projectService.$currentChunk.next(undefined);
      this.projectService.$currentVersionChunks.next(undefined);
    }
  }

  showContent() {
    this.projectService.$contentVisible.next(true);
  }
}
