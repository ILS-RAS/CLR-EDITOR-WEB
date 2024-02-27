import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-entry-filter',
  templateUrl: './entry-filter.component.html',
  styleUrl: './entry-filter.component.scss'
})
export class EntryFilterComponent extends BaseComponent {
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
