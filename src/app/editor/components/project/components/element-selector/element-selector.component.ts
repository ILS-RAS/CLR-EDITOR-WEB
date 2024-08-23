import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ChunkModel, ChunkValueItemModel, ChunkViewModel, ElementModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { lastValueFrom, take, takeUntil } from 'rxjs';
import { MorphModel } from '../../../../models/morphModel';
import { MorphService } from '../../../morph/services/morph.service';
import { ApiService } from '../../../../services/api.service';
import { AppType } from '../../../../enums';
import { ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrl: './element-selector.component.scss'
})
export class ElementSelectorComponent extends BaseComponent implements OnInit {
  display: boolean = false;
  forms: MorphModel[] = []
  selected: MorphModel|undefined = undefined;
  
  constructor(
    private projectService: ProjectService,
    private morphService: MorphService,
    private chunkApiService: ApiService<ChunkModel>,
    private appRef: ApplicationRef,
  ) {
    super()
  }

  ngOnInit() {
    this.projectService.$currentForm.pipe(takeUntil(this.destroyed))
    .subscribe((form) => {
      if (form) {
        this.display = true;
        this.projectService.getMorphs(form);
      } else {
        this.display = false;
      }
    })

    this.projectService.$currentMorphs.pipe(takeUntil(this.destroyed))
    .subscribe((morphs) => {
      this.forms = morphs;
    })

    this.projectService.$selectedDefinition.pipe(takeUntil(this.destroyed))
    .subscribe((def) => {
      this.selected = def;
    })
  }

  async onChange() {
    if (this.selected) {
      this.projectService.$selectedDefinition.next(this.selected);
    } else {
      this.projectService.$selectedDefinition.next(undefined);
    }
    let form = this.projectService.$currentForm.getValue();
    let new_id = this.selected?._id ? this.selected?._id : null;
    if (form) {
      let new_element = new ElementModel({
        _id: form._id,
        morphId: new_id,
        chunkId: this.projectService.$currentChunk.getValue()?._id,
        value: form.value,
        type: form.type,
        order: form.order,
        headerId: this.projectService.$currentHeader.getValue()?._id
      });
      this.projectService.SaveElement(new_element);

      let id = this.projectService.$currentChunk.value?._id!
      this.projectService.GetChunkById(id).then((chunk) => {
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
        
        this.projectService.GetChunkViewById(id).then((res) => {
          this.projectService.$currentChunk.next(res);
        });
      })
    }
  }
}
