import { Injectable } from '@angular/core';
import { TaxonomyModel, TaxonomyViewModel } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { TaxonomyQuery } from '../../../queries';
import { AppType, TaxonomyCategory as TaxonomyCategory } from '../../../enums';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  public $taxonomy = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public $currentCategory = new BehaviorSubject<TaxonomyViewModel | undefined>(
    undefined
  );
  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>) {}

  public async GetTaxonomy() {
    let result = this.taxonomyApiService.findByQuery(
      new TaxonomyViewModel({}),
      JSON.stringify(new TaxonomyQuery({})),
      AppType.Taxonomy
    );
    this.$taxonomy.next(await lastValueFrom<TaxonomyViewModel[]>(result));
  }

  public GetByCategory(category: TaxonomyCategory): TaxonomyViewModel[] {
    return this.$taxonomy.value.filter((i) => i.categoryCode == category);
  }
}
