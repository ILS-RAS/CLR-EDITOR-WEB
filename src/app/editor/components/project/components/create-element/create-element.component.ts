import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MetaService } from '../../services/meta.service';
import { TaxonomyCategory } from '../../../../enums';
import { TaxonomyViewModel } from '../../../../models';
import { MorphModel } from '../../../../models/morphModel';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrl: './create-element.component.scss'
})
export class CreateElementComponent extends BaseComponent implements OnInit {
  definitionForm : FormGroup;

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

  constructor(private metaService: MetaService, fb: FormBuilder) {
    super();

    this.definitionForm = fb.group({
      lemma: ["", [Validators.required]],
      form : ["", [Validators.required]],
      features: [""],
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
    )
  }

  onSubmit(): void {
    this.definitionForm.markAllAsTouched();
    if (!this.definitionForm.valid) {
      console.log("Validation error")
    }
  }
}
