import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TaxonomyViewModel } from '../../../models/taxonomyViewModel';
import { ProjectModel } from '../../../models/projectModel';
import { BehaviorSubject } from 'rxjs';
import { TaxonomyQuery } from '../../../queries/taxonomyQuery';
import { TaxonomyCategoryEnum } from '../../../enums/taxonomyCategory';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public authWorks = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public projects = new BehaviorSubject<ProjectModel[]>([]);

  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>, private projectApiService: ApiService<ProjectModel>) { }

  public async loadProjects(){
    await this.projectApiService.findAll(new ProjectModel({}))
    .toPromise()
    .then((items: ProjectModel[]) => {
      this.projects.next(items);
      Promise.resolve();
    });
  }

  public async loadAuthWorks(){
    return await this.taxonomyApiService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({categoryCode: TaxonomyCategoryEnum.AuthWork}))
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        this.authWorks.next(items);
        Promise.resolve();
      });
  }
}
