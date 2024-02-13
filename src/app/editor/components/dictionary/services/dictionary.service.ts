import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models';
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
  public $index = new BehaviorSubject<MorphModel[] | undefined>(undefined);

  constructor(private morphApiService: ApiService<MorphModel>){

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
}
