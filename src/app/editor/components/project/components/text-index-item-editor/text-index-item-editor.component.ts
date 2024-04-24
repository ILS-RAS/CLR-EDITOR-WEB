import { Component, Inject, OnInit } from '@angular/core';
import { IndexModel } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Helper } from '../../../../../utils';


@Component({
  selector: 'app-text-index-item-editor',
  templateUrl: './text-index-item-editor.component.html',
  styleUrl: './text-index-item-editor.component.scss',
})
export class TextIndexItemEditorComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;
  isDisabled: boolean = false;
  visible: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<TextIndexItemEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public index: IndexModel,
    private formBuilder: UntypedFormBuilder,
    private projectService: ProjectService
    ){
      super();
      this.form = this.formBuilder.group({
        name: new UntypedFormControl(''),
        order: new UntypedFormControl('')
      })
    }

  ngOnInit(): void {
    this.form.controls["name"].setValue(this.index.name);
    this.form.controls["order"].setValue(this.index.order);

    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  Save(): void {
    this.index.name = this.form.controls["name"].value;
    this.index.order = this.form.controls["order"].value;

    this.projectService.SaveIndex(this.index).then((item) => {
      let savedIndex = item as IndexModel;
      if (savedIndex && savedIndex.headerId) {
        this.projectService.GetIndeces(savedIndex.headerId);
        this.dialogRef.close()
      }
    })

  }
}
