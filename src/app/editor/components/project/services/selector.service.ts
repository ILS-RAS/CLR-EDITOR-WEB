import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { MorphModel } from '../../../models/morphModel';
import { MorphService } from '../../morph/services/morph.service';
import { ProjectService } from './project.service';
import { ChunkValueItemModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  public $currentMorphs = new BehaviorSubject<MorphModel[]>([]);
  public $selectedDefinition = new BehaviorSubject<MorphModel|undefined>(undefined);

  constructor(private morphService: MorphService, private projectService: ProjectService) { }

  public async getMorphs(form: ChunkValueItemModel) {
      if (form && form.value) {
        this.morphService.GetItemsByForm(form.value.toLowerCase())
        .then((forms) => {
          this.$currentMorphs.next(forms);
          let selected = forms.find(item => item._id == this.projectService.$currentForm.value?.morphId)
          if (selected) {
            this.$selectedDefinition.next(selected);
          }
        });
      }
    }

  public async addMorph(morph: MorphModel) {
    this.morphService.SaveMorph(morph).then((item) => {
      this.$currentMorphs.next(this.$currentMorphs.getValue().concat([item]));
    });
  }

  public async editMorph(morph: MorphModel) {
    this.morphService.SaveMorph(morph).then((item) => {
      let morphs = this.$currentMorphs.getValue();
      if (morphs.find(morph => morph._id === item._id)) {
        let index = morphs.indexOf(morphs.find(morph => morph._id === item._id)!)
        morphs[index] = item;
        this.$currentMorphs.next(morphs);
      }
    });
  }
  
  public async deleteMorph() {
    let morphs = this.$currentMorphs.getValue();
    let selected = morphs.find(val => val._id === this.$selectedDefinition.getValue()?._id);
    if (selected) {
      this.morphService.DeleteMorph(selected).then((item) => {
        morphs.forEach((morph_item, index) => {
          if (morph_item._id === item._id) {
            morphs.splice(index, 1);
            this.$currentMorphs.next(morphs);
            this.$selectedDefinition.next(undefined);
          }
        });
      });
    }
  }
}
