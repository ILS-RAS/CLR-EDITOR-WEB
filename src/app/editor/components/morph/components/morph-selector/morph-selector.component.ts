import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { MorphService } from '../../services/morph.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MorphEditorComponent } from '../morph-editor/morph-editor.component';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';

@Component({
  selector: 'app-morph-selector',
  templateUrl: './morph-selector.component.html',
  styleUrl: './morph-selector.component.scss',
})
export class MorphSelectorComponent extends BaseComponent implements OnInit {
  isDefined: boolean = false;
  displayedColumns: string[] = [
    'select',
    'form',
    'lemma',
    'pos',
    'gender',
    'case',
    'person',
    'number',
    'tense',
    'mood',
    'voice',
    'degree',
    'dialect',
    'feature',
    'edit',
    'clone',
    'delete',
  ];
  clickedRows = new Set<MorphModel>();
  dataSource: MatTableDataSource<MorphModel> = new MatTableDataSource();
  selection = new SelectionModel<MorphModel>(true, []);
  constructor(
    private projectService: ProjectService,
    private morphService: MorphService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        if (form && form.value) {
          this.morphService
            .GetItemsByForm(form.value?.toLowerCase())
            .then((items) => {
              this.dataSource = new MatTableDataSource<MorphModel>(items);
            });
        }
      });
  }

  IsChecked(morp: MorphModel): boolean {
    return this.projectService.$currentForm.value?.morphId == morp._id;
  }

  add() {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: new MorphModel({})}).afterClosed().subscribe(result=>{

    });
  }
  clone(morph: MorphModel) {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  delete(morph: MorphModel) {
    this.dialog.open(ConfirmComponent, {width:'300px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  edit(morph: MorphModel) {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  removeDefinition(morph: MorphModel) {
    throw new Error('Method not implemented.');
  }
  setDefinition(morph: MorphModel) {
    throw new Error('Method not implemented.');
  }
}
