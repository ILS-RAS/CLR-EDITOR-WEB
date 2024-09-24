import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from '../../../../models/projectModel';
import { TextHeaderEditorComponent } from '../text-header-editor/text-header-editor.component';
import { ProjectService } from '../../services/project.service';
import { HeaderModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { take, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProjectSelectorComponent } from '../project-selector/project-selector.component';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrl: './project-toolbar.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ProjectToolbarComponent extends BaseComponent implements OnInit {
  @Input() project?: ProjectModel;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  menuDisabled: boolean = true;
  contentsDisabled: boolean = true;
  header?: HeaderModel;
  items: MenuItem[] = [];
  selected?: HeaderModel;
  headers?: HeaderModel[];
  contentsOpened: boolean = false;
  ref: DynamicDialogRef | undefined;
  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
    ];
    this.projectService.$currentProject.pipe(takeUntil(this.destroyed)).subscribe((project) => {
      this.menuDisabled = project ? false : true;
    })
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((header) => {
      this.selected = this.header = header;
    });
    this.projectService.$projectHeaders.pipe(takeUntil(this.destroyed)).subscribe(headers=>{
      this.headers = headers;
    });
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe((header) => {
      this.contentsDisabled = header? false : true;
      this.items[1].visible = !this.contentsDisabled;
      this.items[2].visible = !this.contentsDisabled;

    });

  }
  OpenProject(): void {
    this.dialogService.open(ProjectSelectorComponent, { width:'600px', height:'100%' });
  }

  DeleteHeader() {
    this.confirmationService.confirm({
      key:'header-delete',
      message: 'Are you sure you want to delete the selected header?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text",
      header: 'Delete',
      accept: () => {
        if (this.header) {
          this.projectService.MarkHeaderAsDeleted(this.header).then(() => {
            this.messageService.add({severity:'success', summary:'Success', detail: 'The header has been succesfully marked for deletion'}); 
            if (this.header?.projectId) {
              this.projectService.$currentHeader.next(undefined);
              this.projectService.$currentIndeces.next(undefined);
              this.projectService.GetHeadersByProjectId(this.header.projectId);
            }
          });
        }
        
      }
    });
  }

  EditHeader() {
    this.ref = this.dialogService.open(TextHeaderEditorComponent, {
      header: 'Edit header',
      width: '600px',
      data: this.header,
    });

    this.ref.onClose.subscribe((header) => {
      if (header) {
        this.messageService.add({severity:'success', summary:'Success', detail: 'The header has been succesfully edited'});
      }
    });
  }

  AddHeader() {
    this.ref = this.dialogService.open(TextHeaderEditorComponent, {
      header: 'Add header',
      width: '600px',
      data: new HeaderModel({}),
    });

    this.ref.onClose.subscribe((header) => {
      if (header) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The header has been succesfully created'})
      }
    })
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
