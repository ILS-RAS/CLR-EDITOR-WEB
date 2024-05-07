import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MetaService } from '../../../project/services/meta.service';
import { TaxonomyViewModel } from '../../../../models';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-taxonomy-index',
  templateUrl: './taxonomy-index.component.html',
  styleUrl: './taxonomy-index.component.scss',
})
export class TaxonomyIndexComponent extends BaseComponent implements OnInit {
  public indeces?: TaxonomyViewModel[];
  public selected?: TaxonomyViewModel;

  constructor(
    private metaService: MetaService
  ) { 
    super();
  }

  ngOnInit(): void {
      this.metaService.GetTaxonomy().then(() =>{
        this.metaService.$taxonomy.pipe(takeUntil(this.destroyed)).subscribe(
          (items) => {
            this.indeces = [
              ...new Map(
                items
                .filter(i=> i.categoryId !== '')
                .sort((a, b) => a.categoryCode!.localeCompare(b.categoryCode!))
                .map((item) => [item['categoryCode'], item])
              ).values()
            ];
          });
      });
    }

  Select() {
      this.metaService.$currentCategory.next(this.selected);
  }
}
