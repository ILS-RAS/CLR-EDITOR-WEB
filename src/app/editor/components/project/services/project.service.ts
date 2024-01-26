import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TaxonomyViewModel } from '../../../models/taxonomyViewModel';
import { ProjectModel } from '../../../models/projectModel';
import { BehaviorSubject } from 'rxjs';
import { TaxonomyQuery } from '../../../queries/taxonomyQuery';
import { TaxonomyCategoryEnum } from '../../../enums/taxonomyCategory';
import { AppType } from '../../../enums/appType';
import { HeaderModel } from '../../../models/headerModel';
import { HeaderQuery } from '../../../queries/headerQuery';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public authWorks = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public projects = new BehaviorSubject<ProjectModel[]>([]);
  public headers = new BehaviorSubject<HeaderModel[]>([]);
  public currentProject = new BehaviorSubject<ProjectModel | undefined>(new ProjectModel({}));
  constructor(private taxonomyApiService: ApiService<TaxonomyViewModel>, 
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>) { }

  public async GetProjects(){
    await this.projectApiService.findAll(new ProjectModel({}), AppType.Project)
    .toPromise()
    .then((items: ProjectModel[]) => {
      this.projects.next(items);
      Promise.resolve();
    });
  }

  public async GetHeaders(projectId?: string){
    return await this.headerApiService.findByQuery(new HeaderModel({}), JSON.stringify(new HeaderQuery({projectId:projectId})),
    AppType.Header
    ).toPromise()
    .then((items: HeaderModel[]) => {
      this.headers.next(items);
      Promise.resolve();
    });
  }

  public async Save(project: ProjectModel){
    return this.projectApiService.save(project, AppType.Project).toPromise().then((item)=>{
        return item;
    });
  }

  public async GetWorkTaxonomy(){
    return await this.taxonomyApiService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({categoryCode: TaxonomyCategoryEnum.AuthWork})), 
        AppType.Taxonomy
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        this.authWorks.next(items);
        Promise.resolve();
      });
  }
}
