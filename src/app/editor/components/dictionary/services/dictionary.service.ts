import { Injectable } from '@angular/core';
import { DictionaryIndexModel, DictionaryIndexViewModel, ProjectModel } from '../../../models';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { MorphModel } from '../../../models/morphModel';
import { MorphQuery } from '../../../queries';
import { AppType } from '../../../enums';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  
  public $currentDictionary = new BehaviorSubject<ProjectModel | undefined>(undefined);
  public $dictionaryIndex = new BehaviorSubject<DictionaryIndexViewModel[] | undefined>(undefined);
  public $currentLemma = new BehaviorSubject<MorphModel | undefined>(undefined);
  
  constructor(private morphApiService: ApiService<MorphModel>, private dictionaryIndexService: ApiService<DictionaryIndexModel>){

  }

  public InitContext(project: ProjectModel | undefined) {
    this.$currentDictionary.next(project);
  }

  public async GetLemma(lemma: string) {
    let query = new MorphQuery({ lemma: lemma, form: lemma });
    let result = this.morphApiService.findByQuery(new MorphModel({}), JSON.stringify(query), AppType.Morph);
    return await lastValueFrom(result);
  }

  public async GetLemmaItems(lemma: string) {
    let query = new MorphQuery({ lemma: lemma });
    let result = this.morphApiService.findByQuery(new MorphModel({}), JSON.stringify(query), AppType.Morph);
    return await lastValueFrom(result);
  }

  public async SaveDictionaryIndex(dictionaryIndex: DictionaryIndexModel): Promise<DictionaryIndexModel> {

    let result = this.dictionaryIndexService
      .save(dictionaryIndex, AppType.DictionaryIndex);
    
    return await lastValueFrom(result);

  }

  public async GetDictionaryIndeces(projectId: string | undefined){

    let result = this.dictionaryIndexService.findByQuery(new DictionaryIndexModel({}), JSON.stringify({projectId: projectId}), AppType.DictionaryIndex);

    this.$dictionaryIndex.next(await lastValueFrom(result));
  }
}
