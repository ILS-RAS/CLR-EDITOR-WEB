import { Injectable } from '@angular/core';
import {
  EntryModel,
  EntryViewModel,
  ProjectModel,
  TaxonomyModel,
} from '../../../models';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { MorphModel } from '../../../models/morphModel';
import { MorphQuery } from '../../../queries';
import { AppType, EntryElementType, EntryStructType } from '../../../enums';
import { EntryElementModel } from '../../../models/entryElementModel';
import { Helper } from '../../../../utils';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  public $currentDictionary = new BehaviorSubject<ProjectModel | undefined>(
    undefined
  );
  public $entries = new BehaviorSubject<EntryViewModel[] | undefined>(
    undefined
  );
  public $entryElements = new BehaviorSubject<EntryElementModel[] | undefined>(
    undefined
  );
  public $currentEntry = new BehaviorSubject<EntryViewModel | undefined>(
    undefined
  );

  constructor(
    private morphApiService: ApiService<MorphModel>,
    private entryService: ApiService<EntryModel>,
    private entryElementService: ApiService<EntryElementModel>
  ) {}

  public InitContext(project: ProjectModel | undefined) {
    this.$currentDictionary.next(project);
    this.$currentEntry.next(undefined);
  }

  public async GetLemma(lemma: string) {
    let query = new MorphQuery({ lemma: lemma, form: lemma });
    let result = this.morphApiService.findByQuery(
      new MorphModel({}),
      JSON.stringify(query),
      AppType.Morph
    );
    return await lastValueFrom(result);
  }

  public async GetLemmaItems(lemma: string) {
    let query = new MorphQuery({ lemma: lemma });
    let result = this.morphApiService.findByQuery(
      new MorphModel({}),
      JSON.stringify(query),
      AppType.Morph
    );
    return await lastValueFrom(result);
  }

  public async SaveEntry(entry: EntryModel): Promise<EntryModel> {
    let result = this.entryService.save(entry, AppType.Entry);

    return await lastValueFrom(result);
  }

  public async getEntries(projectId: string | undefined) {
    let result = this.entryService.findByQuery(
      new EntryModel({}),
      JSON.stringify({ projectId: projectId }),
      AppType.Entry
    );

    this.$entries.next(await lastValueFrom(result));
  }

  public async DeleteEntry(entry: EntryModel) {
    let result = this.entryService.remove(entry, AppType.Entry);

    await lastValueFrom(result);

    if (this.$currentEntry.value && entry._id == this.$currentEntry.value._id) {
      this.$currentEntry.next(undefined);
    }
  }

  public getEntryElementTypes(): TaxonomyModel[] {
    let types: TaxonomyModel[] = [];

    const values = Object.values(EntryElementType);

    values.forEach((value) => {
      types.push(
        new TaxonomyModel({
          code: value,
        })
      );
    });

    return types;

  }

  public createEntryCard(entry: EntryModel) {
    let header = new EntryElementModel({
      _id: Helper.newGuid(),
      type: EntryStructType.header,
      order: 1,
    });

    let lemma = new EntryElementModel({
      _id: Helper.newGuid(),
      parentId: header._id,
      type: EntryElementType.lemma,
      value: entry._id,
      order: 1,
    });

    let body = new EntryElementModel({
      _id: Helper.newGuid(),
      type: EntryStructType.body,
      order: 2,
    });

    let footer = new EntryElementModel({
      _id: Helper.newGuid(),
      type: EntryStructType.footer,
      order: 3,
    });

    let savedElements: EntryElementModel[] = [];

    savedElements.push(header);
    savedElements.push(lemma);
    savedElements.push(body);
    savedElements.push(footer);

    let e = new EntryModel({
      _id: entry._id,
      entryObj: JSON.stringify(savedElements),
      morphId: entry.morphId,
      projectId: entry.projectId,
    });

    this.SaveEntry(e);
  }

  updateElements(element: EntryElementModel) {
    let entry = this.$currentEntry.value;
    if (entry && entry.entryObj) {
      let elements = JSON.parse(entry.entryObj);
      elements.push(element);
      let e = new EntryModel({
        _id: entry._id,
        entryObj: JSON.stringify(elements),
        morphId: entry.morphId,
        parentId: entry.parentId,
        projectId: entry.projectId
      });
      this.SaveEntry(e).then(saved=>{
        if(saved){
          let list = this.$entries.value;
          if(list){
            let index = list?.findIndex(i => i._id === saved._id);
            list[index].entryObj = saved.entryObj;
            this.$entries.next(list);
            this.$currentEntry.next(list[index]);
          }
        }
      })
    }
  }
}
