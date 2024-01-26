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
import { IndexModel } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public $authWorks = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public $projects = new BehaviorSubject<ProjectModel[]>([]);
  public $currentProject = new BehaviorSubject<ProjectModel | undefined>(
    undefined
  );
  public $currentHeader = new BehaviorSubject<HeaderModel | undefined>(
    undefined
  );

  public $currentIndeces: IndexModel[] = [];

  constructor(
    private taxonomyApiService: ApiService<TaxonomyViewModel>,
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>
  ) {}

  public async GetProjects() {
    await this.projectApiService
      .findAll(new ProjectModel({}), AppType.Project)
      .toPromise()
      .then((items: ProjectModel[]) => {
        this.$projects.next(items);
        Promise.resolve();
      });
  }

  public async GetHeaders(projectId?: string) {
    return await this.headerApiService
      .findByQuery(
        new HeaderModel({}),
        JSON.stringify(new HeaderQuery({ projectId: projectId })),
        AppType.Header
      )
      .toPromise()
      .then((items: HeaderModel[]) => {
        return Promise.resolve(items);
      });
  }

  public async GetIndeces(headerId: string | undefined): Promise<IndexModel[]> {
    return await this.indexApiService
      .findByQuery(
        new IndexModel({}),
        JSON.stringify({ headerId: headerId }),
        AppType.Index
      )
      .toPromise()
      .then((result) => {
        return Promise.resolve(result);
      });
  }

  public async Save(project: ProjectModel) {
    return this.projectApiService
      .save(project, AppType.Project)
      .toPromise()
      .then((item) => {
        return item;
      });
  }

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
