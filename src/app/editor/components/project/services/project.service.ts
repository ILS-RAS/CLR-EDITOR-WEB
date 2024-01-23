import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TaxonomyViewModel } from '../../../models/taxonomyViewModel';
import { ProjectModel } from '../../../models/projectModel';
import { BehaviorSubject } from 'rxjs';
import { TaxonomyQuery } from '../../../queries/taxonomyQuery';
import { TaxonomyCategoryEnum } from '../../../enums/taxonomyCategory';
import { AppType } from '../../../enums/appType';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public authWorks = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public projects = new BehaviorSubject<ProjectModel[]>([]);

  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>, private projectApiService: ApiService<ProjectModel>) { }

  public async GetProjects(){
    await this.projectApiService.findAll(new ProjectModel({apiType:AppType.Project}))
    .toPromise()
    .then((items: ProjectModel[]) => {
      this.projects.next(items);
      Promise.resolve();
    });
  }

  public async save(project: ProjectModel){
    return this.projectApiService.save(project, AppType.Project).toPromise().then((item)=>{
        return item;
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
