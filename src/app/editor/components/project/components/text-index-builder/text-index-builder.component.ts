import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HeaderModel, IndexModel } from '../../../../models';
import { IndexService } from '../../services/index.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { Helper } from '../../../../../utils';
import { ProjectService } from '../../services/project.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-text-index-builder',
  templateUrl: './text-index-builder.component.html',
  styleUrl: './text-index-builder.component.scss',
})
export class TextIndexBuilderComponent extends BaseComponent implements OnInit {
  isRange: boolean = false;
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  index: IndexModel;
  constructor(
    public ref: DynamicDialogRef,
    public refconf: DynamicDialogConfig,
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      startValueInput: new UntypedFormControl(''),
      endValueInput: new UntypedFormControl(''),
      checkControl: new UntypedFormControl(false),
    });
    this.index = refconf.data.index;
  }

  ngOnInit(): void {
    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Change() {
    this.isRange = !this.isRange;
  }

  Cancel() {
    this.ref.close();
  }

  Save() {
      if (this.index) {
        let startValue = this.form.controls["startValueInput"].value;
        let endValue = this.isRange ? this.form.controls["endValueInput"].value : startValue;
        let tempIndex = new IndexModel(this.index);
        
        for (let i = startValue; i <= endValue; i++) {
          tempIndex.name = this.index.name ? `${this.index.name}.${i.toString()}` : i.toString();
          tempIndex.order = i;
          this.projectService.SaveIndex(tempIndex).then((item) => {
            let savedIndex = item as IndexModel;
            if (savedIndex && savedIndex.headerId) {
              this.projectService.GetIndeces(savedIndex.headerId);
            }
          });
        }
        this.ref.close();
      }
  }
}
