import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CreateElementComponent } from '../create-element/create-element.component';
import { MorphModel } from '../../../../models/morphModel';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-element-toolbar',
  templateUrl: './element-toolbar.component.html',
  styleUrl: './element-toolbar.component.scss'
})
export class ElementToolbarComponent extends BaseComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  disableButtons: boolean = false;

  constructor(private dialogService: DialogService, 
    public messageService: MessageService, 
    public confirmationService: ConfirmationService,
    private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.projectService.$selectedDefinition.pipe(takeUntil(this.destroyed))
    .subscribe((def) => {
      this.disableButtons = def ? false : true;
    })
  }

  openAddModal() {
    this.ref = this.dialogService.open(CreateElementComponent, {header: 'Definitio formae', width: '60%', height: '100%', modal: true})

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully saved'});
      }
    })
  }

  openEditModal() {
    this.ref = this.dialogService.open(EditElementComponent, {width: '60%', height: '100%', modal: true});

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully edited'})
      }
    })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected morph?',
      header: 'Delete',
      accept: () => {
        this.projectService.deleteMorph();
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully deleted'})
      }
    });
  }
}
