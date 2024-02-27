import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../../../../components/base/base/base.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-value-editor',
  templateUrl: './text-value-editor.component.html',
  styleUrl: './text-value-editor.component.scss'
})
export class TextValueEditorComponent extends BaseComponent {

  form: UntypedFormGroup;

  @Output() value: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: UntypedFormBuilder){
    super();
    this.form = this.formBuilder.group({
      inputTextValue: new UntypedFormControl('')
    });
  }

  change() {
    this.value.emit(this.form.controls['inputTextValue'].value);
  }

}
