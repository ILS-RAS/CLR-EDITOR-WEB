import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { AppType, ProjectStatus } from '../../../enums';
import { HeaderQuery, ProjectQuery } from '../../../queries';
import {
  IndexModel,
  InterpModel,
  ChunkViewModel,
  ProjectModel,
  HeaderModel,
  ChunkModel,
} from '../../../models';
import { Helper } from '../../../../utils';
import { UiService } from '../../../../services/ui.service';

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

  public $currentVersionChunks = new BehaviorSubject<
    ChunkViewModel[] | undefined
  >(undefined);

  public $showVersion = new BehaviorSubject<boolean>(false);

  constructor(
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>,
    private chunkViewApiService: ApiService<ChunkViewModel>,
    private chunkApiService: ApiService<ChunkModel>,
    private interpApiService: ApiService<InterpModel>,
    private uiService: UiService
  ) {}

  public InitContext(project: ProjectModel) {
    this.$currentProject.next(project);
    this.$projectHeaders.next(undefined);
    this.$currentIndeces.next(undefined);
    this.$currentIndex.next(undefined);
    this.$currentHeader.next(undefined);
    this.$currentChunk.next(undefined);
    this.$currentVersionChunks.next(undefined);
  }
//#region Project
  public async GetProjects() {
    await this.projectApiService
      .findByQuery(
        new ProjectModel({}), 
        JSON.stringify(new ProjectQuery({ status: ProjectStatus.Edited })),
        AppType.Project)
      .toPromise()
      .then((items: ProjectModel[]) => {
        this.$projects.next(items);
        Promise.resolve();
      });
  }

  public async SaveProject(project: ProjectModel): Promise<ProjectModel> {
    return await this.projectApiService
      .save(project, AppType.Project)
      .toPromise()
      .then((item) => {
        return Promise.resolve(item as ProjectModel);
      });
  }


  public async MarkProjectDeleted(project: ProjectModel): Promise<ProjectModel>{
    project.status = ProjectStatus.Deleted;
    project.code = `${project.code}_${project._id}`;
    return await this.SaveProject(project);
  }

//#endregion

//#region Header

public async GetHeaders(projectId: string) {
  await this.headerApiService
    .findByQuery(
      new HeaderModel({}),
      JSON.stringify(new HeaderQuery({ projectId: projectId, status : ProjectStatus.Edited })),
      AppType.Header
    )
    .toPromise()
    .then((items: HeaderModel[]) => {
      this.$projectHeaders.next(items);
      Promise.resolve();
    });
}

public async SaveHeader(header: HeaderModel): Promise<HeaderModel>{
  return await this.headerApiService
  .save(header, AppType.Header)
  .toPromise()
  .then((item) => {
    return Promise.resolve(item as HeaderModel);
  });
}

public async MarkHeaderAsDeleted(header: HeaderModel) {
  header.status = ProjectStatus.Deleted;
  header.code = `${header.code}_${header._id}`;
  return await this.SaveHeader(header);
}
//#endregion

//#region Index
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

public async SaveIndex(index: IndexModel): Promise<IndexModel>{
  return await this.indexApiService
  .save(index, AppType.Index)
  .toPromise()
  .then((item) => {
    return Promise.resolve(item as IndexModel);
  });
}

//#endregion

//#region Chunk
public async GetChunk(indexId: string) {
  await this.chunkViewApiService
    .findByQuery(
      new ChunkViewModel({}),
      JSON.stringify({ indexId: indexId }),
      AppType.Chunk
    )
    .toPromise()
    .then((result) => {
      this.$currentChunk.next(result[0]);
      if (this.$showVersion.value && result[0]) {
        this.GetVersionChunks(result[0]._id, result[0].headerLang == 'lat');
      }
      Promise.resolve();
    });
}

public async DeleteChunk(chunk: ChunkModel) {
  await this.chunkApiService.remove(chunk, AppType.Chunk).toPromise().then(()=>{
    Promise.resolve();
  });
}

public async SaveChunk(chunk: ChunkViewModel) {
  return await this.chunkViewApiService
  .save(chunk, AppType.Chunk)
  .toPromise()
  .then((item) => {
    return Promise.resolve(item);
  });
}

public async GetVersionChunks(chunkId: string, interp: boolean = true) {
    
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

    await this.chunkViewApiService
      .findByQuery(
        new ChunkViewModel({}),
        JSON.stringify({ _id: chunkIds }),
        AppType.Chunk
      )
      .toPromise()
      .then((result) => {
        this.$currentVersionChunks.next(result);
        Promise.resolve();
      });
  }
}

//#endregion


}
