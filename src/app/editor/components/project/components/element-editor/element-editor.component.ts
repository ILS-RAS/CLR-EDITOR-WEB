import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaxonomyViewModel, ChunkValueItemModel } from '../../../../models';
import { MetaService } from '../../services/meta.service';
import { ProjectService } from '../../services/project.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Validators } from '@angular/forms';
import { TaxonomyCategory } from '../../../../enums';
import { MorphModel } from '../../../../models/morphModel';

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrl: './element-editor.component.scss'
})

export class ElementEditorComponent extends BaseComponent implements OnInit {
  definitionForm : FormGroup;
  currentForm?: ChunkValueItemModel;
  currentDef?: MorphModel;
  editExisting: boolean;

  languages?: TaxonomyViewModel[];
  genders?: TaxonomyViewModel[];
  pos?: TaxonomyViewModel[];
  cases?: TaxonomyViewModel[];
  persons?: TaxonomyViewModel[];
  numbers?: TaxonomyViewModel[];
  tenses?: TaxonomyViewModel[];
  moods?: TaxonomyViewModel[];
  voices?: TaxonomyViewModel[];
  degrees?:TaxonomyViewModel[];
  dialects?:TaxonomyViewModel[];

  constructor(private metaService: MetaService, 
    private fb: FormBuilder, 
    private projectService: ProjectService,
    private refconf: DynamicDialogConfig,
    private ref: DynamicDialogRef) {
    super();
    
    this.editExisting = this.refconf.data.editExisting;

    this.definitionForm = this.fb.group({
      lemma: ["", [Validators.required]],
      form: ["", [Validators.required]],
      feature: [null],
      lang: [null, [Validators.required]],
      pos:[null,[Validators.required]],
      gender: [null],
      case:[null],
      person:[null],
      number:[null],
      tense:[null],
      mood:[null],
      voice:[null],
      degree:[null],
      dialect:[null]
    });
  }


  ngOnInit(): void {
    this.metaService.GetTaxonomy().then(() => {
      this.languages = this.metaService.GetByCategory(TaxonomyCategory.Lang);
      this.pos = this.metaService.GetByCategory(TaxonomyCategory.Pos);
      this.genders = this.metaService.GetByCategory(TaxonomyCategory.Gender);
      this.cases = this.metaService.GetByCategory(TaxonomyCategory.Case);
      this.persons = this.metaService.GetByCategory(TaxonomyCategory.Person);
      this.numbers = this.metaService.GetByCategory(TaxonomyCategory.Number);
      this.tenses = this.metaService.GetByCategory(TaxonomyCategory.Tense);
      this.moods = this.metaService.GetByCategory(TaxonomyCategory.Mood);
      this.voices = this.metaService.GetByCategory(TaxonomyCategory.Voice);
      this.degrees = this.metaService.GetByCategory(TaxonomyCategory.Degree);
      this.dialects = this.metaService.GetByCategory(TaxonomyCategory.Dialect);
    }
  );

  this.projectService.$currentForm.pipe(takeUntil(this.destroyed))
    .subscribe((form) => {
      this.currentForm = form;
    });

  this.projectService.$selectedDefinition.pipe(takeUntil(this.destroyed))
    .subscribe((def) => {
      this.currentDef = def;
    })
    
  this.definitionForm.controls['form'].setValue(this.currentForm?.value?.toLowerCase());
  this.definitionForm.controls['form'].disable();
  
  if (this.editExisting) {
    let features: string[]|undefined = this.currentForm?.feature?.split(',');

    this.definitionForm.patchValue({
      lemma: this.currentForm?.lemma,
      lang: this.currentForm?.lang,
      pos: this.currentForm?.pos,
      gender: this.currentForm?.gender,
      case: this.currentForm?.case,
      person: this.currentDef?.person,
      number: this.currentDef?.number,
      tense: this.currentDef?.tense,
      mood: this.currentDef?.mood,
      voice: this.currentDef?.voice,
      degree: this.currentDef?.degree,
      dialect: this.currentDef?.dialect,
      feature: features
      });
    }
  }

  get _lemma() { 
    return this.definitionForm.get('lemma');
  }

  get _lang() {
    return this.definitionForm.get('lang');
  }

  get _pos() {
    return this.definitionForm.get('pos');
  }

  onSubmit() : void {
    this.definitionForm.markAllAsTouched();
    if (this.definitionForm.valid) {
      let feature = null;
      if (this.definitionForm.get('feature')?.value) {
        feature = this.definitionForm.get('feature')?.value.toString()
      }
      let newMorph = new MorphModel({});
      newMorph.lemma = this.definitionForm.get('lemma')?.value;
      newMorph.form = this.definitionForm.get('form')?.value;
      newMorph.pos = this.definitionForm.get('pos')?.value;
      newMorph.gender = this.definitionForm.get('gender')?.value;
      newMorph.case = this.definitionForm.get('case')?.value;
      newMorph.dialect = this.definitionForm.get('dialect')?.value;
      newMorph.feature = feature;
      newMorph.person = this.definitionForm.get('person')?.value;
      newMorph.number = this.definitionForm.get('number')?.value;
      newMorph.tense = this.definitionForm.get('tense')?.value;
      newMorph.mood = this.definitionForm.get('mood')?.value;
      newMorph.voice = this.definitionForm.get('voice')?.value;
      newMorph.degree = this.definitionForm.get('degree')?.value;
      newMorph.lang = this.definitionForm.get('lang')?.value;
      newMorph.isRule = "false";

      if (this.editExisting) {
        newMorph._id = this.currentForm?.morphId!;
        this.projectService.editMorph(newMorph);
      } else {
        this.projectService.addMorph(newMorph);
      }

      this.ref.close(newMorph);
    }
  }
}
