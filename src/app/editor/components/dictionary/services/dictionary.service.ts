import { Injectable } from '@angular/core';
import { EntryModel, EntryViewModel, ProjectModel } from '../../../models';
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
  public $entries = new BehaviorSubject<EntryViewModel[] | undefined>(undefined);
  public $currentEntry = new BehaviorSubject<MorphModel | undefined>(undefined);
  
  constructor(private morphApiService: ApiService<MorphModel>, private entryService: ApiService<EntryModel>){

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

  public async SaveEntry(entry: EntryModel): Promise<EntryModel> {

    let result = this.entryService
      .save(entry, AppType.Entry);
    
    return await lastValueFrom(result);

  }

  public async GetEntries(projectId: string | undefined){

    let result = this.entryService.findByQuery(new EntryModel({}), JSON.stringify({projectId: projectId}), AppType.Entry);

    this.$entries.next(await lastValueFrom(result));
  }
}
