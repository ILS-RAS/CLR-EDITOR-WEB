import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MorphModel } from '../../../../models/morphModel';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { MorphService } from '../../services/morph.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MorphEditorComponent } from '../morph-editor/morph-editor.component';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { ChunkModel, ChunkValueItemModel, ChunkViewModel, ElementModel } from '../../../../models';

@Component({
  selector: 'app-morph-selector',
  templateUrl: './morph-selector.component.html',
  styleUrl: './morph-selector.component.scss',
})
export class MorphSelectorComponent extends BaseComponent implements OnInit {
  isDefined: boolean = false;
  currentForm?: ChunkValueItemModel;
  clickedRows = new Set<MorphModel>();
  forms: MorphModel[] = [];
  selectedForms!: MorphModel;
  selection = new SelectionModel<MorphModel>(true, []);
  constructor(
    private projectService: ProjectService,
    private morphService: MorphService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        if (form && form.value) {
          this.currentForm = form;
          this.morphService
            .GetItemsByForm(form.value?.toLowerCase())
            .then((items) => {
              this.forms = items;
              this.SetChecked(items);
            });
        }
      });
  }

  SetChecked(forms: MorphModel[]) {
    let checked = forms.find(i=>i._id == this.projectService.$currentForm.value?.morphId);
    if(checked){
      this.selectedForms = checked;
    }
  }

  add() {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: new MorphModel({})}).afterClosed().subscribe(result=>{

    });
  }
  clone(morph: MorphModel) {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  delete(morph: MorphModel) {
    this.dialog.open(ConfirmComponent, {width:'300px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  edit(morph: MorphModel) {
    this.dialog.open(MorphEditorComponent, {width:'470px', data: morph}).afterClosed().subscribe(result=>{

    });
  }
  removeDefinition(morph: MorphModel) {
    let element = new ElementModel({
      _id: this.currentForm?._id,
      chunkId:  this.projectService.$currentChunk.value?._id,
      headerId: this.projectService.$currentChunk.value?.headerId,
      morphId: undefined,
      order: this.currentForm?.order,
      type: this.currentForm?.type,
      value: this.currentForm?.value
    });

    this.projectService.SaveElement(element).then(saved=>{
      if(this.projectService.$currentChunk.value?.valueObj){
        let elements: ChunkValueItemModel[] = JSON.parse(this.projectService.$currentChunk.value?.valueObj);
        let chunkValueItemModel = elements.find(i=>i.order == saved.order);
        chunkValueItemModel!.value = saved.value;
        chunkValueItemModel!.type = saved.type;
        chunkValueItemModel!.order = saved.order;
        
        elements = elements.filter(i=>i.order != saved.order);

        if(chunkValueItemModel){

          elements.push(chunkValueItemModel);

        }
        
        let chunkView = this.projectService.$currentChunk.value;

        chunkView.valueObj = JSON.stringify(elements.sort(({order:a}, {order:b}) => a! - b!));

        let chunk = new ChunkModel({
          _id: chunkView._id,
          created: chunkView.created,
          headerId: chunkView.headerId,
          indexId: chunkView.indexId,
          status: chunkView.status,
          updated: chunkView.updated,
          value: chunkView.value,
          valueObj: chunkView.valueObj
        });

        this.projectService.UpdateChunkDefinition(chunk).then((chunk)=>{
          let view = chunk as ChunkViewModel;
          if(view && view.indexId){
            this.projectService.$currentIndex.next(this.projectService.$currentIndeces.value?.find(i=>i._id == view.indexId));
            this.projectService.$currentForm.next(undefined);
            this.projectService.$currentVersionChunks.next(undefined);
            this.projectService.GetChunk(view.indexId);
          }
        });

      }
    });
  }
  setDefinition(morph: MorphModel) {
    let element = new ElementModel({
      _id: this.currentForm?._id,
      chunkId:  this.projectService.$currentChunk.value?._id,
      headerId: this.projectService.$currentChunk.value?.headerId,
      morphId: morph._id,
      order: this.currentForm?.order,
      type: this.currentForm?.type,
      value: this.currentForm?.value
    });

    this.projectService.SaveElement(element).then(saved=>{
      if(this.projectService.$currentChunk.value?.valueObj){
        let elements: ChunkValueItemModel[] = JSON.parse(this.projectService.$currentChunk.value?.valueObj);
        let chunkValueItemModel = elements.find(i=>i.order == saved.order);
        chunkValueItemModel!.value = saved.value;
        chunkValueItemModel!.type = saved.type;
        chunkValueItemModel!.order = saved.order;
        chunkValueItemModel!.morphId = saved.morphId;
        chunkValueItemModel!.case = morph.case;
        chunkValueItemModel!.degree = morph.degree;
        chunkValueItemModel!.dialect = morph.dialect;
        chunkValueItemModel!.feature = morph.feature;
        chunkValueItemModel!.form = morph.form;
        chunkValueItemModel!.gender = morph.gender;
        chunkValueItemModel!.lang = morph.lang;
        chunkValueItemModel!.lemma = morph.lemma;
        chunkValueItemModel!.number = morph.number;
        chunkValueItemModel!.mood = morph.mood;
        chunkValueItemModel!.person = morph.person;
        chunkValueItemModel!.pos = morph.pos;
        chunkValueItemModel!.tense = morph.tense;
        chunkValueItemModel!.voice = morph.voice;


        elements = elements.filter(i=>i.order != saved.order);

        if(chunkValueItemModel){

          elements.push(chunkValueItemModel);

        }
        
        let chunkView = this.projectService.$currentChunk.value;

        chunkView.valueObj = JSON.stringify(elements.sort(({order:a}, {order:b}) => a! - b!));

        let chunk = new ChunkModel({
          _id: chunkView._id,
          created: chunkView.created,
          headerId: chunkView.headerId,
          indexId: chunkView.indexId,
          status: chunkView.status,
          updated: chunkView.updated,
          value: chunkView.value,
          valueObj: chunkView.valueObj
        });

        this.projectService.UpdateChunkDefinition(chunk).then((chunk)=>{
          let view = chunk as ChunkViewModel;
          if(view && view.indexId){
            this.projectService.$currentIndex.next(this.projectService.$currentIndeces.value?.find(i=>i._id == view.indexId));
            this.projectService.$currentForm.next(undefined);
            this.projectService.$currentVersionChunks.next(undefined);
            this.projectService.GetChunk(view.indexId);
          }
        });

      }
    });
  }
}
