import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { TaxonomyViewModel } from '../../../../models';
import { MetaService } from '../../services/meta.service';
import { takeUntil } from 'rxjs';
import { TaxonomyCategory } from '../../../../enums';

@Component({
  selector: 'app-taxonomy-items',
  templateUrl: './taxonomy-items.component.html',
  styleUrl: './taxonomy-items.component.scss'
})
export class TaxonomyItemsComponent extends BaseComponent implements OnInit {
  index?: TaxonomyViewModel;
  list?: TaxonomyViewModel[];
  displayedColumns: string[] = ['code', 'desc'];
  constructor(private metaService: MetaService) {
    super();
  }
  ngOnInit(): void {
    this.metaService.$currentCategory.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.index = item;
      this.list = this.metaService.GetByCategory(item?.categoryCode as TaxonomyCategory).sort((a, b) => a.code!.localeCompare(b.code!));
    })
  }
}
