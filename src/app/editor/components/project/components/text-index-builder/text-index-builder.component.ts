import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderModel, IndexModel } from '../../../../models';
import { IndexService } from '../../services/index.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { Helper } from '../../../../../utils';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-index-builder',
  templateUrl: './text-index-builder.component.html',
  styleUrl: './text-index-builder.component.scss',
})
export class TextIndexBuilderComponent extends BaseComponent implements OnInit {
  isRange: boolean = false;
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<TextIndexBuilderComponent>,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public index: IndexModel,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      startValueInput: new UntypedFormControl(''),
      endValueInput: new UntypedFormControl(''),
      checkControl: new UntypedFormControl(false),
    });
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
    this.dialogRef.close();
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
        this.dialogRef.close();
      }
  }
}
