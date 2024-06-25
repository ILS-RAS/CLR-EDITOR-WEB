import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MetaService } from '../../services/meta.service';
import { TaxonomyCategory } from '../../../../enums';
import { TaxonomyViewModel } from '../../../../models';
import { MorphModel } from '../../../../models/morphModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MorphService } from '../../../morph/services/morph.service';
import { takeUntil } from 'rxjs';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { SelectorService } from '../../services/selector.service';



@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrl: './create-element.component.scss'
})
export class CreateElementComponent extends BaseComponent implements OnInit {
  definitionForm : FormGroup;
  currentForm?: string;
  saveSuccessful: boolean = false;

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
    private ref: DynamicDialogRef,
    private selectorService: SelectorService) {
    super();

    this.definitionForm = this.fb.group({
      lemma: ["", [Validators.required]],
      form: ["", [Validators.required]],
      feature: [""],
      lang: ["", [Validators.required]],
      pos:["",[Validators.required]],
      gender: [""],
      case:[""],
      person:[""],
      number:[""],
      tense:[""],
      mood:[""],
      voice:[""],
      degree:[""],
      dialect:[""]
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

    this.projectService.$currentForm
      .pipe(takeUntil(this.destroyed))
      .subscribe((form) => {
        if (form && form.value) {
          this.currentForm = form.value.toLowerCase();
        }
      });

    this.definitionForm.controls['form'].setValue(this.currentForm);
    this.definitionForm.controls['form'].disable();
  }

  get _lemma() { 
    return this.definitionForm.get('lemma')
  }

  get _lang() {
    return this.definitionForm.get('lang')
  }

  get _pos() {
    return this.definitionForm.get('pos')
  }

  onSubmit(): void {
    this.definitionForm.markAllAsTouched();
    if (this.definitionForm.valid) {
      let feature = undefined;
      if (this.definitionForm.get('feature')?.value) {
        feature = this.definitionForm.get('feature')?.value.toString()
      }
      let newMorph = new MorphModel({
        lemma: this.definitionForm.get('lemma')?.value,
        form: this.definitionForm.get('form')?.value,
        pos: this.definitionForm.get('pos')?.value.code,
        gender: this.definitionForm.get('gender')?.value.code,
        case: this.definitionForm.get('case')?.value.code,
        dialect: this.definitionForm.get('dialect')?.value.code,
        feature: feature,
        person: this.definitionForm.get('person')?.value.code,
        number: this.definitionForm.get('number')?.value.code,
        tense: this.definitionForm.get('tense')?.value.code,
        mood: this.definitionForm.get('mood')?.value.code,
        voice: this.definitionForm.get('voice')?.value.code,
        degree: this.definitionForm.get('degree')?.value.code,
        lang: this.definitionForm.get('lang')?.value.code,
        isRule: "false",
      });
      this.selectorService.addMorph(newMorph);
      this.ref.close(newMorph)
      }
    }
  }
