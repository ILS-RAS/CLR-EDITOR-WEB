import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MorphModel } from '../../../../models/morphModel';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import {lastValueFrom, takeUntil } from 'rxjs';
import { ElementEditorComponent } from '../element-editor/element-editor.component';


@Component({
  selector: 'app-element-toolbar',
  templateUrl: './element-toolbar.component.html',
  styleUrl: './element-toolbar.component.scss',
  providers: [ConfirmationService]
})
export class ElementToolbarComponent extends BaseComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  disableButtons: boolean = false;
  loading: boolean = false;

  constructor(private dialogService: DialogService, 
    public messageService: MessageService, 
    private confirmationService: ConfirmationService,
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
    this.ref = this.dialogService.open(ElementEditorComponent, {
      header: 'Definitio formae', 
      width: '60%', 
      height: '100%', 
      modal: true,
      data: {
        editExisting: false,
        newMorph: new MorphModel({})
      }})

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully saved'});
      }
    })
  }

  openEditModal() {
    this.ref = this.dialogService.open(ElementEditorComponent, {
      width: '60%', 
      height: '100%', 
      modal: true,
      data: {
        editExisting: true,
        newMorph: this.projectService.$selectedDefinition.value,
      }});

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully edited'})
      }
    })
  }

  openCloneModal() {
    this.ref = this.dialogService.open(ElementEditorComponent, {
      width: '60%', 
      height: '100%', 
      modal: true,
      data: {
        editExisting: false,
        newMorph: this.projectService.$selectedDefinition.value,
      }
    });

    this.ref.onClose.subscribe((item: MorphModel) => {
      if (item) {
        this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully saved'})
      }
    })
  }


  markAsRule() {
    let morph = this.projectService.$selectedDefinition.value;
    if (morph) {
      morph.isRule = morph.isRule ? 'false' : 'true';
      this.projectService.editMorph(morph).then(() => {
        if (morph.isRule == 'true') {
          this.messageService.add({severity:'success', summary:'Success', detail: 'Now the morph is marked as rule'});
        } else {
          this.messageService.add({severity:'success', summary:'Success', detail: 'Now the morph is no longer a rule'})
        }
      });
    }
  }

  markForAll() {
    
  }

  unmarkForAll() {

  }

requestMorphs() {
    let reqBody = {
      lexeme: this.projectService.$currentForm.value?.value?.toLowerCase(),
      lang: this.projectService.$currentHeader.value?.lang
    }
    
    this.projectService.requestMorphs(reqBody).then((res) => {
      if (!(res instanceof Error)) {
        lastValueFrom(res).finally(() => {
          this.loading = false;
          if (this.projectService.$currentForm.value) {
            this.projectService.getMorphs(this.projectService.$currentForm.value);
          }
          this.messageService.add({severity:'success', summary:'Success', detail:'New morphs have been successfully requested. If you do not see any changes, it is possible that all the forms are already contained in the database.'});
        });
      } else {
        this.loading = false;
        this.messageService.add({severity:'danger', summary:'Error', detail:'An error occured. Please try again later'})
      }
    })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      key: 'morph-delete',
      message: 'Are you sure you want to delete the selected morph?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      header: 'Delete',
      accept: () => {
        this.projectService.deleteMorph().finally(() => {
          this.messageService.add({severity:'success', summary:'Success', detail:'The morph has been succesfully deleted'});
        });
      }
    });
  }
}
