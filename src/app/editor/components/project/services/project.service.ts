import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AppType, ProjectStatus, UserRole } from '../../../enums';
import { ChunkQuery, ElementQuery, HeaderQuery, MorphQuery, ProjectQuery } from '../../../queries';
import {
  IndexModel,
  InterpModel,
  ChunkViewModel,
  ProjectModel,
  HeaderModel,
  ChunkModel,
  ChunkValueItemModel,
  ElementViewModel,
} from '../../../models';
import { Helper } from '../../../../utils';
import { ProjectType } from '../../../enums/projectType';
import { MorphModel } from '../../../models/morphModel';
import { ElementModel } from '../../../models/elementModel';
import { query } from '@angular/animations';
import { UserService } from '../../user/services/user.service';
import { MorphService } from '../../morph/services/morph.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  public $contentVisible = new BehaviorSubject<boolean>(true);

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

  public $currentIndexListPosition = new BehaviorSubject<number | undefined>(undefined);

  public $currentChunk = new BehaviorSubject<ChunkViewModel | undefined>(
    undefined
  );

  public $currentForm = new BehaviorSubject<ChunkValueItemModel | undefined>(undefined);

  public $currentVersionChunks = new BehaviorSubject<
    ChunkViewModel[] | undefined
  >(undefined);

  public $currentMorphs = new BehaviorSubject<MorphModel[]>([]);

  public $selectedDefinition = new BehaviorSubject<MorphModel|undefined>(undefined);


  constructor(
    private projectApiService: ApiService<ProjectModel>,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>,
    private chunkViewApiService: ApiService<ChunkViewModel>,
    private chunkApiService: ApiService<ChunkModel>,
    private interpApiService: ApiService<InterpModel>,
    private elementApiService:ApiService<ElementModel>,
    private elementViewApiService:ApiService<ElementViewModel>,
    private morphService: MorphService,
  ) {}

  public InitProjectContext(project: ProjectModel | undefined) {
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
    let query = new ProjectQuery({ status: ProjectStatus.Edited });
    let result = this.projectApiService.findByQuery(new ProjectModel({}), JSON.stringify(query), AppType.Project);
    this.$projects.next(await lastValueFrom(result));
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

public async GetHeadersByProjectId(projectId: string) {
  let result = this.headerApiService
    .findByQuery(
      new HeaderModel({}),
      JSON.stringify(new HeaderQuery({projectId: projectId})),
      AppType.Header
    );
    this.$projectHeaders.next(await lastValueFrom(result));
}

public async GetHeadersByLang(langCode: string) {
  let result = this.headerApiService
    .findByQuery(
      new HeaderModel({}),
      JSON.stringify(new HeaderQuery({lang: langCode})),
      AppType.Header
    );
    return await lastValueFrom(result);
}

public async SaveHeader(header: HeaderModel): Promise<HeaderModel>{
  let result = this.headerApiService
  .save(header, AppType.Header);
  return await lastValueFrom(result);
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
      let res_sorted = result.sort(this.SortIndeces);
      this.$currentIndeces.next(res_sorted);
      this.$currentIndexListPosition.next(0);
      if(result[0]._id) {
        this.$currentIndex.next(result[0]);
        this.GetChunk(result[0]._id);
      }
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

public async DeleteIndex(index: IndexModel) {
  await this.indexApiService.remove(index, AppType.Index).toPromise().then(()=>{
    Promise.resolve();
  });
}

//TO DO: join these two into one function
public async GetNextIndex() {
  if (this.$currentIndexListPosition) {
    let value = this.$currentIndexListPosition.value;
    this.$currentIndexListPosition.next(value! + 1);
    this.$currentIndex.next(this.$currentIndeces.value![value! + 1]);
    this.GetChunk(this.$currentIndex.value!._id!)
    this.$currentForm.next(undefined);
    this.$currentMorphs.next([]);
    this.$selectedDefinition.next(undefined);
  }
}

public async GetPrevIndex() {
  if (this.$currentIndexListPosition) {
    let value = this.$currentIndexListPosition.value;
    this.$currentIndexListPosition.next(value! - 1);
    this.$currentIndex.next(this.$currentIndeces.value![value! - 1]);
    this.GetChunk(this.$currentIndex.value!._id!);
    this.$currentForm.next(undefined);
    this.$currentMorphs.next([]);
    this.$selectedDefinition.next(undefined);
  }
}

private SortIndeces(a: IndexModel, b: IndexModel){
  if (a.name === b.name) {
    return 0;
  }

  let a_arr = a.name!.split('.');
  let b_arr = b.name!.split('.');
  
  let len = Math.min(a_arr.length, b_arr.length);

  for (let i = 0; i < len; i++) {
    if (Number(a_arr[i]) > Number(b_arr[i])) {
      return 1;
    } else if (Number(a_arr[i]) < Number(b_arr[i])) {
      return - 1
    }
  }

  if (a_arr.length < b_arr.length) {
    return -1;
  }

  if (b_arr.length < a_arr.length) {
    return 1;
  }

  return 0;
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
      if (result[0]) {
        this.GetVersionChunks(result[0]._id, result[0].headerLang == 'lat');
      }
      else {
        this.$currentVersionChunks.next(undefined);
      }
      Promise.resolve();
    });
}

public async GetChunkViewById(chunkId: string) {
  let result = this.chunkViewApiService.getById(chunkId, AppType.ChunkView);
    return await lastValueFrom<ChunkViewModel>(result);
}

public async GetChunkByQuery(query: ChunkQuery){
  let result = this.chunkApiService.findByQuery(new ChunkModel({}), JSON.stringify(query), AppType.Chunk);
  return await lastValueFrom(result);
}

public async DeleteChunk(chunk: ChunkModel) {
  await this.chunkApiService.remove(chunk, AppType.Chunk).toPromise().then(()=>{
    Promise.resolve();
  });
}

public async SaveChunk(chunk: ChunkModel) {
  let result = this.chunkApiService
  .save(chunk, AppType.Chunk);
  return await lastValueFrom<ChunkModel>(result);
}

public async UpdateChunkDefinition(chunk: ChunkModel) {
  let result = this.chunkApiService.patch(chunk, AppType.Chunk);
  return await lastValueFrom(result);
}

public async GetChunkById(id: string) {
  let result = this.chunkApiService
  .getById(id, AppType.Chunk);
  return await lastValueFrom<ChunkModel>(result);
}

public async SaveElement(element: ElementModel){
  let result = this.elementApiService
  .save(element, AppType.Element);
  return await lastValueFrom<ElementModel>(result);
}

public async GetElementView(elementModel: ElementModel){
  let result = this.elementViewApiService
  .findOne(elementModel, AppType.ElementView);
  return await lastValueFrom(result);
}

public async GetElementsByQuery(query: ElementQuery) {
  let result = this.elementApiService.findByQuery(new ElementModel({}), JSON.stringify(query), AppType.Element);
  return await lastValueFrom<ElementModel[]>(result);
}

public async DeleteElementsByChunk(chunkId: string){
  let result = this.elementApiService
  .removeByQuery(new  ElementModel({}), JSON.stringify(new ElementQuery({chunkId: chunkId})), AppType.Element);
  return await lastValueFrom<ElementModel>(result);
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

    let result = this.chunkViewApiService
      .findByQuery(
        new ChunkViewModel({}),
        JSON.stringify({ _id: chunkIds }),
        AppType.Chunk
      );
      this.$currentVersionChunks.next(await lastValueFrom(result));
  }
}

public async SaveInterpLink(InterpModel:InterpModel){
  let result = this.interpApiService.save(InterpModel, AppType.Interp);
  return await lastValueFrom(result);
}

//#endregion
//#region Morph

public async getMorphs(form: ChunkValueItemModel) {
  if (form && form.value) {
    this.morphService.GetItemsByForm(form.value.toLowerCase())
    .then((forms) => {
      this.$currentMorphs.next(forms);
      let selected = forms.find(item => item._id == this.$currentForm.value?.morphId)
      if (selected) {
        this.$selectedDefinition.next(selected);
      } else {
        this.$selectedDefinition.next(undefined);
      }
    });
  }
}

public async addMorph(morph: MorphModel) {
  this.morphService.SaveMorph(morph).then((item) => {
   if (this.$currentForm) {
    this.getMorphs(this.$currentForm.value!);
   }
  });
}

public async editMorph(morph: MorphModel) {
  let morphed_elements = await this.GetElementsByQuery(new ElementQuery({morphId: morph._id}));
  await Promise.all(morphed_elements.map(async (element) => {
    this.GetChunkById(element.chunkId!).then((chunk) => {
      let chunk_elements: ChunkValueItemModel[] = JSON.parse(chunk.valueObj as string);
      let item = chunk_elements.find(elt => elt.morphId === morph._id)
      if (item) {
        item.lemma = morph.lemma;
        item.form = morph.form;
        item.pos = morph.pos;
        item.gender = morph.gender;
        item.case = morph.case;
        item.dialect = morph.dialect;
        item.feature = morph.feature;
        item.person = morph.person;
        item.number = morph.number;
        item.tense = morph.tense;
        item.mood = morph.mood;
        item.voice = morph.voice;
        item.lang = morph.lang;
      }
      this.$currentForm.next(item);
      chunk.valueObj = JSON.stringify(chunk_elements);
      chunk.updated = new Date().toISOString();
        if (!chunk.created) {
          chunk.created = new Date('0001-01-01T00:00:00.000Z').toISOString();
        } 
        this.UpdateChunkDefinition(chunk);
    });
  }));
  this.morphService.SaveMorph(morph).then((item) => {
    let morphs = this.$currentMorphs.getValue();
    if (morphs.find(morph => morph._id === item._id)) {
      let index = morphs.indexOf(morphs.find(morph => morph._id === item._id)!)
      morphs[index] = item;
      this.$currentMorphs.next(morphs);
      this.$selectedDefinition.next(item);
    }
  });
}

public async deleteMorph() {
  let morphs = this.$currentMorphs.getValue();
  let selected = morphs.find(val => val._id === this.$selectedDefinition.getValue()?._id);
  if (selected) {
    let morphed_elements = await this.GetElementsByQuery(new ElementQuery({morphId: selected._id}));
    await Promise.all(morphed_elements.map(async (element) => {
      let new_element = new ElementModel({
        _id: element._id,
        morphId: null,
        chunkId: element.chunkId,
        headerId: element.headerId,
        value: element.value,
        type: element.type,
        order: element.order
      });
      this.SaveElement(new_element);

      this.GetChunkById(element.chunkId!).then((chunk) => {
        let chunk_elements: ChunkValueItemModel[] = JSON.parse(chunk.valueObj as string);
        let item = chunk_elements.find(elt => elt._id === new_element._id);
        if (item) {
          item.morphId = null;
          item.lemma = undefined;
          item.form = undefined;
          item.pos = undefined;
          item.gender = undefined;
          item.case = undefined;
          item.dialect = undefined;
          item.feature = undefined;
          item.person = undefined;
          item.number = undefined;
          item.tense = undefined;
          item.mood = undefined;
          item.voice = undefined;
          item.lang = undefined;
        }
        chunk.valueObj = JSON.stringify(chunk_elements);
        chunk.updated = new Date().toISOString();
        if (!chunk.created) {
          chunk.created = new Date('0001-01-01T00:00:00.000Z').toISOString();
        } 
        this.UpdateChunkDefinition(chunk);
      })})).then(() => {        
        this.morphService.DeleteMorph(selected).then((item) => {
          if (item) {
            morphs.forEach((morph_item, index) => {
              if (morph_item._id === item._id) {
                morphs.splice(index, 1);
                this.$currentMorphs.next(morphs);
              }
            });
          }     
        }).then(() => {
          this.$selectedDefinition.next(undefined);
          this.GetChunkViewById(this.$currentChunk.value?._id!).then((res) => {
            this.$currentChunk.next(res);
          }); 
        });
      })
  }
}
//#endregion
}
