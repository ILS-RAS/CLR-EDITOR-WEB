import { Injectable } from '@angular/core';
import { TaxonomyModel, TaxonomyViewModel } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { TaxonomyQuery } from '../../../queries';
import {
  AppType,
  TaxonomyCategory as TaxonomyCategory,
} from '../../../enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  public $taxonomy = new BehaviorSubject<TaxonomyViewModel[]>([]);

  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>) {
    
  }

  public async GetTaxonomy() {
    return await this.taxonomyApiService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({})),
        AppType.Taxonomy
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        this.$taxonomy.next(items);
        Promise.resolve();
      });
  }

  public GetByCategory(category: TaxonomyCategory): TaxonomyViewModel[] {
    return this.$taxonomy.value.filter((i) => i.categoryCode == category);
  }

}
