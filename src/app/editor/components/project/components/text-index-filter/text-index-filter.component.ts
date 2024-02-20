import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-text-index-filter',
  templateUrl: './text-index-filter.component.html',
  styleUrl: './text-index-filter.component.scss'
})
export class TextIndexFilterComponent extends BaseComponent {
  label: string = 'Quaesitio...';
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(private formBuilder: UntypedFormBuilder){
    super();
    this.form = this.formBuilder.group({
      formaInput: new UntypedFormControl('')
    });
  }
}
