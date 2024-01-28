import { Injectable } from '@angular/core';
import { TaxonomyViewModel } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { TaxonomyQuery } from '../../../queries';
import { AppType, TaxonomyCategoryEnum } from '../../../enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  public $authWorks = new BehaviorSubject<TaxonomyViewModel[]>([]);
  
  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>) { }

  public async GetWorkTaxonomy() {
    return await this.taxonomyApiService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(
          new TaxonomyQuery({ categoryCode: TaxonomyCategoryEnum.AuthWork })
        ),
        AppType.Taxonomy
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        this.$authWorks.next(items);
        Promise.resolve();
      });
  }
}
