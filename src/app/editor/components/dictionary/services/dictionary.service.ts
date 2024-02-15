import { Injectable } from '@angular/core';
import { ElementViewModel, ProjectModel } from '../../../models';
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

  constructor(private morphApiService: ApiService<MorphModel>, private elementViewService: ApiService<ElementViewModel>){

  }

  public InitContext(project: ProjectModel | undefined) {
    this.$currentDictionary.next(project);
  }

  public async GetLemma(lemma: string) {
    let query = new MorphQuery({ lemma: lemma, form: lemma, lang:'lat' });
    let result = this.elementViewService.findByQuery(new MorphModel({}), JSON.stringify(query), AppType.Morph);
    return await lastValueFrom(result);
  }

  public async GetLemmaItems(lemma: string) {
    let query = new MorphQuery({ lemma: lemma, form: lemma });
    let result = this.elementViewService.findByQuery(new MorphModel({}), JSON.stringify(query), AppType.ElementView);
    return await lastValueFrom(result);
  }


}
