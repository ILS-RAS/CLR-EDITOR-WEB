import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { MorphModel } from '../../../models/morphModel';
import { MorphService } from '../../morph/services/morph.service';
import { ChunkValueItemModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  public $currentMorphs = new BehaviorSubject<MorphModel[]>([]);
  public $newMorph = new BehaviorSubject<MorphModel|undefined>(undefined);

  constructor(private morphService: MorphService) { }

  public async getMorphs(form: ChunkValueItemModel) {
      if (form && form.value) {
        this.morphService.GetItemsByForm(form.value.toLowerCase())
        .then((forms) => {
          this.$currentMorphs.next(forms);
        }) 
      }
    }

  public async addMorph(newMorph: MorphModel) {
    this.morphService.SaveMorph(newMorph).then((item) => {
      this.$currentMorphs.next(this.$currentMorphs.getValue().concat([item]));
    })
  }

  
}
