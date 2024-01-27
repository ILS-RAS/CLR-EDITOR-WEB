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
import { ChunkModel } from '../../../models/chunkModel';
import { ChunkViewModel } from '../../../models/chunkViewModel';
import { InterpModel } from '../../../models/interpModel';

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

  public $currentIndex = new BehaviorSubject<IndexModel | undefined>(undefined);

  public $currentChunk = new BehaviorSubject<ChunkViewModel | undefined>(undefined);

  public $currentInterpChunk = new BehaviorSubject<ChunkViewModel | undefined>(undefined);

  public $showVersion = new BehaviorSubject<boolean>(false);

  constructor(
    private taxonomyApiService: ApiService<TaxonomyViewModel>,
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>,
    private chunkApiService: ApiService<ChunkViewModel>,
    private interpApiService: ApiService<InterpModel>
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

  public async GetChunk(indexId:string | undefined){
    await this.chunkApiService
    .findByQuery(
      new ChunkViewModel({}),
      JSON.stringify({ indexId: indexId}),
      AppType.Chunk
    ).toPromise()
    .then((result)=>{
      this.$currentChunk.next(result[0]);
      if(this.$showVersion.value){
        this.GetInterp(result[0]._id, result[0].headerLang == 'lat');
      }
      Promise.resolve();
    });
  }

  public async GetInterp(
    id: string,
    interp: boolean = true
  ) {
    let query = interp ? { sourceId: id } : { interpId: id };

    const interps = await this.interpApiService
      .findByQuery(new InterpModel({}), JSON.stringify(query), AppType.Interp)
      .toPromise();

    if (interps.length == 0) {
      Promise.resolve([]);
    } else {
      let chunkIds = interp
        ? interps.map((i: { interpId: any; }) => i.interpId)
        : interps.map((i_1: { sourceId: any; }) => i_1.sourceId);

        await this.chunkApiService
        .findByQuery(
          new ChunkViewModel({}),
          JSON.stringify({ _id: chunkIds[0]}),
          AppType.Chunk
        ).toPromise()
        .then((result)=>{
          this.$currentInterpChunk.next(result[0]);
          Promise.resolve();
        });
    }
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
