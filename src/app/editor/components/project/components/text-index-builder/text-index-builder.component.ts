import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HeaderModel, IndexModel } from '../../../../models';
import { IndexService } from '../../services/index.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { Helper } from '../../../../../utils';
import { ProjectService } from '../../services/project.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export function CustomRangeValidator(form: UntypedFormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = form.get('startValueInput')?.value;
    const end = form.get('endValueInput')?.value;

    return start !== null && end !== null && start <= end ? null : {range : true}
  }
}

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
      startValueInput: new UntypedFormControl(0,
        Validators.required,
      ),
      endValueInput: new UntypedFormControl(''),
      checkControl: new UntypedFormControl(false),
    },
    );
    this.index = refconf.data.index;
  }

  ngOnInit(): void {
    this.form.addValidators(CustomRangeValidator(this.form));
    this.form.updateValueAndValidity();
    
    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  get _endValue() {
    return this.form.get('endValueInput');
  }

  get _startValue() {
    return this.form.get('startValueInput');
  }
  

  Change() {
    this.isRange = !this.isRange;
  }

  Cancel() {
    this.ref.close();
  }

  Save() {
    console.log (this.form.valid)
      if (this.index && this.form.valid) {
        let startValue = this.form.controls["startValueInput"].value;
        let endValue = this.isRange ? this.form.controls["endValueInput"].value : startValue;
        let tempIndex = new IndexModel(this.index);
        
        for (let i = startValue; i <= endValue; i++) {
          tempIndex.name = this.index.name ? `${this.index.name}.${i.toString()}` : i.toString();
          tempIndex.order = i;
          this.projectService.SaveIndex(tempIndex).then((item) => {
            let savedIndex = item as IndexModel;
            if (savedIndex && savedIndex.headerId) {
              this.projectService.GetIndeces(savedIndex.headerId).then((res) => {
                this.ref.close(res);
              });
            }
          });
        }
      } 
  }
}
