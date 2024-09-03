import { Component, OnInit } from '@angular/core';
import { IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Helper } from '../../../../../utils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-text-index-item-editor',
  templateUrl: './text-index-item-editor.component.html',
  styleUrl: './text-index-item-editor.component.scss',
})
export class TextIndexItemEditorComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;
  isDisabled: boolean = false;
  visible: boolean = true;
  label: string = "Index";
  index: IndexModel;
  constructor(
    public ref: DynamicDialogRef,
    public refconf: DynamicDialogConfig,
    private formBuilder: UntypedFormBuilder,
    private projectService: ProjectService
    ){
      super();
      this.form = this.formBuilder.group({
        name: new UntypedFormControl(''),
        order: new UntypedFormControl('')
      });
      this.index = refconf.data.index;
    }

  ngOnInit(): void {
    console.log(this.index);
    
    this.form.controls["name"].setValue(this.index.name);
    this.form.controls["order"].setValue(this.index.order);

    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Cancel(): void {
    this.ref.close();
  }

  Save(): void {
    this.index.name = this.form.controls["name"].value;
    this.index.order = this.form.controls["order"].value;

    this.projectService.SaveIndex(this.index).then((item) => {
      let savedIndex = item as IndexModel;
      if (savedIndex && savedIndex.headerId) {
        this.projectService.GetIndeces(savedIndex.headerId);
        this.ref.close()
      }
    })

  }
}
