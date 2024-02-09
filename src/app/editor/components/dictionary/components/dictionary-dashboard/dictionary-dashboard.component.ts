import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryBuilderComponent } from '../dictionary-builder/dictionary-builder.component';
import { ProjectModel } from '../../../../models';

@Component({
  selector: 'app-dictionary-dashboard',
  templateUrl: './dictionary-dashboard.component.html',
  styleUrl: './dictionary-dashboard.component.scss',
})
export class DictionaryDashboardComponent extends BaseComponent {
  constructor(private dialog: MatDialog) {
    super();
  }
  BuildDictionary() {
    this.dialog.open(DictionaryBuilderComponent, {
      width: '1200px',
      data: new ProjectModel({}),
    });
  }
}
