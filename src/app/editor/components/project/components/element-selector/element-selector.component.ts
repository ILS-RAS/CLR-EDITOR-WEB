import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ChunkModel, ChunkValueItemModel, ChunkViewModel, ElementModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { MorphModel } from '../../../../models/morphModel';
import { MorphService } from '../../../morph/services/morph.service';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrl: './element-selector.component.scss'
})
export class ElementSelectorComponent extends BaseComponent implements OnInit {
  currentForm?: ChunkValueItemModel
  forms: MorphModel[] = []
  selected!: MorphModel;
  
  constructor(
    private projectService: ProjectService,
    private morphService: MorphService
  ) {
    super()
  }

  ngOnInit() {
    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        if (form && form.value) {
          this.currentForm = form;
          this.morphService
            .GetItemsByForm(form.value?.toLowerCase())
            .then((forms) => {
              this.forms = forms;
              this.setChecked(forms);
            })
        }
      })
  }

  setChecked(forms: MorphModel[]) {
    let selected = forms.find(item => item._id == this.projectService.$currentForm.value?.morphId)
    if (selected) {
      this.selected = selected;
    }
  }
}
