import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { MorphService } from '../../services/morph.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-morph-selector',
  templateUrl: './morph-selector.component.html',
  styleUrl: './morph-selector.component.scss'
})
export class MorphSelectorComponent extends BaseComponent implements OnInit {
removeDefinition(_t187: any) {
throw new Error('Method not implemented.');
}
setDefinition(_t187: any) {
throw new Error('Method not implemented.');
}

  isDefined:boolean = false;
  list: MorphModel[] = [];
  displayedColumns: string[] = ['select', 'form', 'lemma', 'pos', 'gender', 'case', 'person', 'number', 'tense', 'mood', 'voice', 'degree', 'dialect', 'feature'];
  clickedRows = new Set<MorphModel>();
  dataSource: MatTableDataSource<MorphModel> = new MatTableDataSource();
  selection = new SelectionModel<MorphModel>(true, []);
  constructor(private projectService: ProjectService, private morphService: MorphService){
    super()
  }

  ngOnInit(): void {
    this.projectService.$currentForm.pipe(takeUntil(this.destroyed)).subscribe(form=>{
      if(form && form.value){
        this.morphService.GetItemsByForm(form.value?.toLowerCase()).then(items=>{
          this.dataSource = new MatTableDataSource<MorphModel>(items);
        });
      }
    })
  }

  IsChecked(morp: MorphModel): boolean {
    return this.projectService.$currentForm.value?.morphId == morp._id;
  }
}
