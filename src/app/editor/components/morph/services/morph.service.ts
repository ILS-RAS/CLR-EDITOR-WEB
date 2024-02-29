import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MorphModel } from '../../../models/morphModel';
import { MorphQuery } from '../../../queries';
import { AppType } from '../../../enums';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MorphService {

  constructor(private morphApiService: ApiService<MorphModel>) { }

  //#region Morph
public async GetMorphItems(lang: string): Promise<MorphModel[]> {
  let items = this.morphApiService
    .findByQuery(
      new MorphModel({}),
      JSON.stringify(new MorphQuery({ isRule: 'true', lang: lang })),
      AppType.Morph
    );
    return await lastValueFrom<MorphModel[]>(items); 
}

public async GetItemsByForm(form: string): Promise<MorphModel[]> {
  let items = this.morphApiService
    .findByQuery(
      new MorphModel({}),
      JSON.stringify(new MorphQuery({ form: form })),
      AppType.Morph
    );
    return await lastValueFrom<MorphModel[]>(items); 
}

//#endregion
}
