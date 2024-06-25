import { Component } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { MorphModel } from '../../../../models/morphModel';
import { OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent extends BaseComponent implements OnInit {
  currentForms: MorphModel[] = [];
  selectedForm?: MorphModel; 

  constructor(private selectorService: SelectorService) { 
    super();
  }

  ngOnInit(): void {
    this.selectorService.$currentMorphs.pipe(
      takeUntil(this.destroyed)
    ).subscribe((forms) => {
      if (forms) {
        this.currentForms = forms;
      }
    })
  }


}
