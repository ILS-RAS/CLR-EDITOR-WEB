import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-word-filter',
  templateUrl: './word-filter.component.html',
  styleUrl: './word-filter.component.scss'
})
export class WordFilterComponent extends BaseComponent {
  label: string = 'Выбрать лемму ...';
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  constructor(private formBuilder: UntypedFormBuilder){
    super();
    this.form = this.formBuilder.group({
      formaInput: new UntypedFormControl('')
    });
  }
}
