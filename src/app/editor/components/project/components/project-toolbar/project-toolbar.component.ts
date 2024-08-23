import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { TextHeaderEditorComponent } from '../text-header-editor/text-header-editor.component';
import { ProjectService } from '../../services/project.service';
import { HeaderModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectSelectorComponent } from '../project-selector/project-selector.component';


@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss'
})
export class ProjectToolbarComponent extends BaseComponent implements OnInit {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  header?: HeaderModel;
  items: MenuItem[] = [];
  selected?: HeaderModel;
  headers?: HeaderModel[];
  contentsOpened: boolean = false;
  ref: DynamicDialogRef | undefined;
  constructor(
    private projectService: ProjectService,
    public dialogService: DialogService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Добавить текст',
        icon: 'pi pi-plus',
        command: () => this.AddHeader(),
      },
      {
        label: 'Редактировать текст',
        icon: 'pi pi-pencil',
        command: () => this.EditHeader(),
      },
      {
        label: 'Удалить текст',
        icon: 'pi pi-trash',
        command: () => this.DeleteHeader(),
      },
      {
        label: 'Открыть содержание',
        icon: 'pi pi-list',
        command: () => this.OpenContents(),
        disabled: false
      }
    ];
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((item) => {
      this.selected = this.header = item;
    });
    this.projectService.$projectHeaders.pipe(takeUntil(this.destroyed)).subscribe(headers=>{
      this.headers = headers;
    })
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((header) => {
      this.items[3].disabled = header? false : true;
    })

  }
  OpenProject(): void {
    this.dialogService.open(ProjectSelectorComponent, { width:'600px', height:'100%' });
  }

  //#TODO: rewrite to use confirm dialog service, not component
  DeleteHeader() {
    // this.dialogService
    //   .open(ConfirmComponent, { width:'600px', data: this.header?.desc })
    //   .subscribe((res) => {
    //     if (res && this.header) {
    //       this.projectService.MarkHeaderAsDeleted(this.header).then(() => {
    //         if (this.header?.projectId) {
    //           this.projectService.GetHeadersByProjectId(this.header.projectId);
    //           this.projectService.$currentHeader.next(undefined);
    //           this.projectService.$currentIndeces.next(undefined);
    //           this.uiService.$indexPanelOpened.next(false);
    //         }
    //       });
    //     }
    //   });
  }

  EditHeader() {
    this.dialogService.open(TextHeaderEditorComponent, {
      width: '600px',
      data: this.header,
    });
  }

  AddHeader() {
    this.dialogService.open(TextHeaderEditorComponent, {
      width: '600px',
      data: new HeaderModel({}),
    });
  }

  OpenContents() {
    this.contentsOpened = true;
  }

  Close() {
    this.onClose.emit();
  }

  Change() {
    if(this.selected && this.selected?._id){
      this.projectService.$currentHeader.next(this.selected);
      this.projectService.GetIndeces(this.selected?._id);
      this.projectService.$currentForm.next(undefined);
      this.projectService.$currentIndex.next(undefined);
      this.projectService.$currentChunk.next(undefined);
      this.projectService.$currentVersionChunks.next(undefined);
      this.projectService.$selectedDefinition.next(undefined);
    }
  }

  showContent() {
    this.projectService.$contentVisible.next(true);
  }
}
