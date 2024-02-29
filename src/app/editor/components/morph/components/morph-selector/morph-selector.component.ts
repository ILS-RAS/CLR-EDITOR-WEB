import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { MorphService } from '../../services/morph.service';

@Component({
  selector: 'app-morph-selector',
  templateUrl: './morph-selector.component.html',
  styleUrl: './morph-selector.component.scss'
})
export class MorphSelectorComponent extends BaseComponent implements OnInit {
  isDefined:boolean = false;
  list: MorphModel[] = [];
  displayedColumns: string[] = ['form', 'lemma', 'pos', 'gender', 'case', 'dialect', 'feature', 'person', 'number', 'tense', 'mood', 'voice', 'degree'];
  constructor(private projectService: ProjectService, private morphService: MorphService){
    super()
  }

  ngOnInit(): void {
    this.projectService.$currentForm.pipe(takeUntil(this.destroyed)).subscribe(form=>{
      if(form && form.value){
        this.morphService.GetItemsByForm(form.value?.toLowerCase()).then(items=>{
          this.list = items;
          this.isDefined = items.filter(i=>i._id == form.morphId).length == 1;
        });
      }
    })
  }


}
