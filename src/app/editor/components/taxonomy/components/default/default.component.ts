import { Component, OnInit } from '@angular/core';
import { TaxonomyViewModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MetaService } from '../../../project/services/meta.service';
import { takeUntil } from 'rxjs';
import { TaxonomyService } from '../../services/taxonomy.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent extends BaseComponent implements OnInit {
public visible: boolean = false;
constructor(private taxonomyService: TaxonomyService){
  super();
}
  ngOnInit(): void {
    this.taxonomyService.$contentVisible.pipe(takeUntil(this.destroyed)).subscribe(visible=>{
      this.visible = visible;
    })
  }

createTaxonomy(): void {
  throw new Error('Method not implemented.')
}
}
