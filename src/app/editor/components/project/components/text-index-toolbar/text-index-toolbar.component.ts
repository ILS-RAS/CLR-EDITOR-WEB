import { Component, Input, OnInit } from '@angular/core';
import { HeaderModel, IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { TextIndexBuilderComponent } from '../text-index-builder/text-index-builder.component';
import { takeUntil } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-text-index-toolbar',
  templateUrl: './text-index-toolbar.component.html',
  styleUrl: './text-index-toolbar.component.scss',
})
export class TextIndexToolbarComponent extends BaseComponent implements OnInit {
  @Input() index?: IndexModel;
  header?:HeaderModel;
  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.projectService.$currentHeader.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.header = item;
    });
  }

  CreateTopIndex() {
    this.dialog
      .open(TextIndexBuilderComponent, {
        width: '600px',
        data: this.index ?? new IndexModel({headerId: this.projectService.$currentHeader.value?._id}),
      });
  }
}
