import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ChunkModel, ChunkValueItemModel, ChunkViewModel, ElementModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { lastValueFrom, takeUntil } from 'rxjs';
import { MorphModel } from '../../../../models/morphModel';
import { MorphService } from '../../../morph/services/morph.service';
import { SelectorService } from '../../services/selector.service';
import { ApiService } from '../../../../services/api.service';
import { AppType } from '../../../../enums';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrl: './element-selector.component.scss'
})
export class ElementSelectorComponent extends BaseComponent implements OnInit {
  display: boolean = false;
  forms: MorphModel[] = []
  selected?: MorphModel;
  
  constructor(
    private projectService: ProjectService,
    private morphService: MorphService,
    private chunkApiService: ApiService<ChunkModel>,
    private selectorService: SelectorService,
  ) {
    super()
  }

  ngOnInit() {
    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        if (form) {
          this.selectorService.getMorphs(form)
          .then(() => {
            this.selectorService.$currentMorphs.subscribe((forms) => {
              this.forms = forms;
              this.selectorService.$selectedDefinition.subscribe((def) => {
                this.selected = def;
                this.display = true;
              })
            })
          })
        };
      })

    this.projectService.$currentIndex
    .pipe(takeUntil(this.destroyed))
    .subscribe((index) => {
      if (index) {
        this.selectorService.$currentMorphs.next([]);
        this.display = false;
      }
    })
  }

  setChecked(forms: MorphModel[]) {
    let selected = forms.find(item => item._id == this.projectService.$currentForm.value?.morphId)
    if (selected) {
      this.selected = selected;
    }
  }

  async onChange() {
    if (this.selected) {
      this.selectorService.$selectedDefinition.next(this.selected);
      let new_id = this.selected?._id;
      let form = this.projectService.$currentForm.getValue()
      if (form) {
        form.morphId = new_id;
        let new_element = new ElementModel({
          _id: form._id,
          chunkId: this.projectService.$currentChunk.getValue()?._id,
          value: form.value,
          type: form.type,
          order: form.order,
          morphId: new_id,
          headerId: this.projectService.$currentHeader.getValue()?._id
        });
        this.projectService.SaveElement(new_element);


        this.projectService.GetChunkById(this.projectService.$currentChunk.value?._id!).then((chunk) => {
          let elements: ChunkValueItemModel[] = JSON.parse(chunk.valueObj as string);
          let item = elements.find(elt => elt._id === new_element._id);
          if (item) {
            item.morphId = new_element.morphId;
            item.lemma = this.selected?.lemma;
            item.form = this.selected?.form;
            item.pos = this.selected?.pos;
            item.gender = this.selected?.gender;
            item.case = this.selected?.case;
            item.dialect = this.selected?.dialect;
            item.feature = this.selected?.feature;
            item.person = this.selected?.person;
            item.number = this.selected?.number;
            item.tense = this.selected?.tense;
            item.mood = this.selected?.mood;
            item.voice = this.selected?.voice;
            item.lang = this.selected?.lang;
          }
          chunk.valueObj = JSON.stringify(elements);
          chunk.updated = new Date().toISOString();
          if (!chunk.created) {
            chunk.created = new Date('0001-01-01T00:00:00.000Z').toISOString();
          } // TO DO: make a script to add creation time to all the chunks in the db
          this.projectService.UpdateChunkDefinition(chunk);
        })
      }
    }
  }
}
