import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CreateElementComponent } from '../create-element/create-element.component';
import { MorphModel } from '../../../../models/morphModel';
import { EditElementComponent } from '../edit-element/edit-element.component';
import { ConfirmationService } from 'primeng/api';
import { SelectorService } from '../../services/selector.service';


@Component({
  selector: 'app-element-toolbar',
  templateUrl: './element-toolbar.component.html',
  styleUrl: './element-toolbar.component.scss'
})
export class ElementToolbarComponent extends BaseComponent  {
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, 
    public messageService: MessageService, 
    public confirmationService: ConfirmationService,
    private selectorService: SelectorService) {
    super();
  }

  openAddModal() {
    this.ref = this.dialogService.open(CreateElementComponent, {header: 'Definitio formae', width: '60%', height: '100%', modal: true})

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully saved'});
      }
    })
  }

  // TODO: add checking whether any of the morphs is selected
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
        this.selectorService.deleteMorph();
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully deleted'})
      }
    });
  }
}
