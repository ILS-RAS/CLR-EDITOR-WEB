import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../project/services/project.service';
import { UserModel } from '../../../../models';
import { UserRole } from '../../../../enums';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs';
import { Helper } from '../../../../../utils';

export class Role {
  code?: number;
  name?: string;
}
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss',
})
export class UserEditorComponent extends BaseComponent implements OnInit {
  isDisabled: boolean = true;
  title?: string = 'Ratio';
  form: UntypedFormGroup;
  roles?: Role[] = [];
  constructor(
    public dialogRef: MatDialogRef<UserEditorComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private formBuilder: UntypedFormBuilder
  ) {
    super();

    this.form = this.formBuilder.group({
      emailInput: new UntypedFormControl(''),
      passwordInput: new UntypedFormControl(''),
      nameInput: new UntypedFormControl(''),
      roleSelect: new UntypedFormControl(''),
    });
    this.roles?.push(
      { code: UserRole.Administrator, name: 'Administrator' },
      { code: UserRole.Editor, name: 'Editor' }
    );
  }

  ngOnInit(): void {
    if (this.user._id) {
      this.form.controls['emailInput'].setValue(this.user.email);
      this.form.controls['nameInput'].setValue(this.user.name);
      this.form.controls['passwordInput'].setValue(this.user.password);
      this.form.controls['roleSelect'].setValue(this.user.role);
    }

    this.form.statusChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => (this.isDisabled = !Helper.IsFormValid(val)));
  }

  Save() {
    this.user.email = this.form.controls['emailInput'].value;
    this.user.name = this.form.controls['nameInput'].value;
    this.user.password = this.form.controls['passwordInput'].value;
    this.user.role = this.form.controls['roleSelect'].value;
    this.userService.Signup(this.user).then((user) => {
      if (user) {
        this.dialogRef.close();
      }
    });
  }
  Cancel() {
    this.dialogRef.close();
  }
}
