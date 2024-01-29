import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AppType } from '../../../enums';
import { HeaderQuery } from '../../../queries';
import {
  IndexModel,
  InterpModel,
  ChunkViewModel,
  ProjectModel,
  HeaderModel,
  ChunkModel,
} from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  public $projects = new BehaviorSubject<ProjectModel[]>([]);

  public $currentProject = new BehaviorSubject<ProjectModel | undefined>(
    undefined
  );

  public $projectHeaders = new BehaviorSubject<HeaderModel[] | undefined>(
    undefined
  );

  public $currentHeader = new BehaviorSubject<HeaderModel | undefined>(
    undefined
  );

  public $currentIndeces = new BehaviorSubject<IndexModel[] | undefined>(
    undefined
  );

  public $currentIndex = new BehaviorSubject<IndexModel | undefined>(undefined);

  public $currentChunk = new BehaviorSubject<ChunkViewModel | undefined>(
    undefined
  );

  public $currentInterpChunks = new BehaviorSubject<
    ChunkViewModel[] | undefined
  >(undefined);

  public $showVersion = new BehaviorSubject<boolean>(false);

  constructor(
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>,
    private chunkApiService: ApiService<ChunkViewModel>,
    private interpApiService: ApiService<InterpModel>
  ) {}

  public InitContext(project: ProjectModel) {
    this.$currentProject.next(project);
    this.$projectHeaders.next(undefined);
    this.$currentIndeces.next(undefined);
    this.$currentIndex.next(undefined);
    this.$currentHeader.next(undefined);
    this.$currentChunk.next(undefined);
    this.$currentInterpChunks.next(undefined);
  }

  public async GetProjects() {
    await this.projectApiService
      .findAll(new ProjectModel({}), AppType.Project)
      .toPromise()
      .then((items: ProjectModel[]) => {
        this.$projects.next(items);
        Promise.resolve();
      });
  }

  public async GetHeaders(projectId: string) {
    await this.headerApiService
      .findByQuery(
        new HeaderModel({}),
        JSON.stringify(new HeaderQuery({ projectId: projectId })),
        AppType.Header
      )
      .toPromise()
      .then((items: HeaderModel[]) => {
        this.$projectHeaders.next(items);
        Promise.resolve();
      });
  }

  public async GetIndeces(headerId: string): Promise<IndexModel[]> {
    return await this.indexApiService
      .findByQuery(
        new IndexModel({}),
        JSON.stringify({ headerId: headerId }),
        AppType.Index
      )
      .toPromise()
      .then((result) => {
        this.$currentIndeces.next(result);
        return Promise.resolve(result);
      });
  }

  public async GetChunk(indexId: string) {
    await this.chunkApiService
      .findByQuery(
        new ChunkViewModel({}),
        JSON.stringify({ indexId: indexId }),
        AppType.Chunk
      )
      .toPromise()
      .then((result) => {
        this.$currentChunk.next(result[0]);
        if (this.$showVersion.value && result[0]) {
          this.GetInterp(result[0]._id, result[0].headerLang == 'lat');
        }
        Promise.resolve();
      });
  }

  public async SaveHeader(header: HeaderModel){
    return await this.headerApiService
    .save(header, AppType.Header)
    .toPromise()
    .then((item) => {
      return Promise.resolve(item);
    });
  }

  public async SaveChunk(chunk: ChunkModel) {
    
  }

  public async GetInterp(chunkId: string, interp: boolean = true) {
    let query = interp ? { sourceId: chunkId } : { interpId: chunkId };

    const interps = await this.interpApiService
      .findByQuery(new InterpModel({}), JSON.stringify(query), AppType.Interp)
      .toPromise();

    if (interps.length == 0) {
      Promise.resolve([]);
    } else {
      let chunkIds = interp
        ? interps.map((i: { interpId: any }) => i.interpId)
        : interps.map((i_1: { sourceId: any }) => i_1.sourceId);

      await this.chunkApiService
        .findByQuery(
          new ChunkViewModel({}),
          JSON.stringify({ _id: chunkIds }),
          AppType.Chunk
        )
        .toPromise()
        .then((result) => {
          this.$currentInterpChunks.next(result);
          Promise.resolve();
        });
    }
  }

  public async SaveProject(project: ProjectModel) {
    return await this.projectApiService
      .save(project, AppType.Project)
      .toPromise()
      .then((item) => {
        return Promise.resolve(item);
      });
  }
}
