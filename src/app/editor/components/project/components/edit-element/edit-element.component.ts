import { Component } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { MorphModel } from '../../../../models/morphModel';
import { OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { TaxonomyViewModel } from '../../../../models';
import { TaxonomyCategory } from '../../../../enums';
import { MetaService } from '../../services/meta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss'
})
export class EditElementComponent extends BaseComponent implements OnInit {
  definitionForm: FormGroup;
  currentForm?: MorphModel;

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

  constructor(private selectorService: SelectorService, 
    private metaService: MetaService, 
    private fb: FormBuilder,
    private ref: DynamicDialogRef) { 
    super();

    this.definitionForm = this.fb.group({
      lemma: ["", [Validators.required]],
      form: ["", [Validators.required]],
      feature: [""],
      lang: ["", [Validators.required]],
      pos:["", [Validators.required]],
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
    });

    this.selectorService.$selectedDefinition.subscribe((def) => {
      this.currentForm = def;
    })

    let features: string[]|undefined = this.currentForm?.feature?.split(',')

    this.definitionForm.controls['form'].setValue(this.currentForm?.form?.toLowerCase());
    this.definitionForm.controls['form'].disable();

    this.definitionForm.controls['lemma'].setValue(this.currentForm?.lemma?.toLowerCase());

    this.definitionForm.patchValue({
      lang: this.currentForm?.lang,
      pos: this.currentForm?.pos,
      gender: this.currentForm?.gender,
      case: this.currentForm?.case,
      person: this.currentForm?.person,
      number: this.currentForm?.number,
      tense: this.currentForm?.tense,
      mood: this.currentForm?.mood,
      voice: this.currentForm?.voice,
      degree: this.currentForm?.degree,
      dialect: this.currentForm?.dialect,
      feature: features
    })
  }

  onSubmit(): void {
    let feature: String[] | undefined = this.definitionForm.get('feature')?.value;
    if (feature === undefined || feature.length === 0) {
      this.currentForm!.feature = null
    } else {
      this.currentForm!.feature = feature.join(',')
    }
    
    this.currentForm!.lemma = this.definitionForm.get('lemma')?.value 
    this.currentForm!.pos = this.definitionForm.get('pos')?.value
    this.currentForm!.gender = this.definitionForm.get('gender')?.value; 
    this.currentForm!.case = this.definitionForm.get('case')?.value;
    this.currentForm!.dialect = this.definitionForm.get('dialect')?.value;
    this.currentForm!.person = this.definitionForm.get('person')?.value;
    this.currentForm!.number = this.definitionForm.get('number')?.value;
    this.currentForm!.tense = this.definitionForm.get('tense')?.value;
    this.currentForm!.mood = this.definitionForm.get('mood')?.value;
    this.currentForm!.voice = this.definitionForm.get('voice')?.value;
    this.currentForm!.degree = this.definitionForm.get('degree')?.value;
    this.currentForm!.lang = this.definitionForm.get('lang')?.value;

    this.selectorService.editMorph(this.currentForm!);
    console.log(this.currentForm)
    this.ref.close(this.currentForm);
  }
}
