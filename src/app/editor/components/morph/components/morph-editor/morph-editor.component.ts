import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MorphService } from '../../services/morph.service';
import { MetaService } from '../../../project/services/meta.service';
import { MorphModel } from '../../../../models/morphModel';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TaxonomyViewModel } from '../../../../models';
import { TaxonomyCategory } from '../../../../enums';

@Component({
  selector: 'app-morph-editor',
  templateUrl: './morph-editor.component.html',
  styleUrl: './morph-editor.component.scss'
})
export class MorphEditorComponent extends BaseComponent implements OnInit {

  isDisabled: boolean = true;
  form: UntypedFormGroup;
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

  constructor(public dialogRef: MatDialogRef<MorphEditorComponent>,
    private morphService: MorphService,
    private metaService: MetaService,
    @Inject(MAT_DIALOG_DATA) public morph: MorphModel,
    private formBuilder: UntypedFormBuilder){
    super();
    this.form = this.formBuilder.group({
      lemmaInput: new UntypedFormControl(''),
      formInput: new UntypedFormControl(''),
      langSelect: new UntypedFormControl(''),
      posSelect: new UntypedFormControl(''),
      genderSelect: new UntypedFormControl(''),
      personSelect: new UntypedFormControl(''),
      numberSelect: new UntypedFormControl(''),
      caseSelect: new UntypedFormControl(''),
      tenseSelect: new UntypedFormControl(''),
      moodSelect: new UntypedFormControl(''),
      voiceSelect: new UntypedFormControl(''),
      degreeSelect: new UntypedFormControl(''),
      dialectSelect: new UntypedFormControl(''),
      featureInput: new UntypedFormControl('')
    });
  }
  ngOnInit(): void {

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

    if(this.morph._id){
      this.form.controls['lemmaInput'].setValue(this.morph.lemma);
      this.form.controls['formInput'].setValue(this.morph.form);
      this.form.controls['langSelect'].setValue(this.morph.lang);
      this.form.controls['posSelect'].setValue(this.morph.pos);
      this.form.controls['genderSelect'].setValue(this.morph.gender);
      this.form.controls['personSelect'].setValue(this.morph.person);
      this.form.controls['numberSelect'].setValue(this.morph.number);
      this.form.controls['caseSelect'].setValue(this.morph.case);
      this.form.controls['tenseSelect'].setValue(this.morph.tense);
      this.form.controls['moodSelect'].setValue(this.morph.mood);
      this.form.controls['voiceSelect'].setValue(this.morph.voice);
      this.form.controls['degreeSelect'].setValue(this.morph.degree);
      this.form.controls['dialectSelect'].setValue(this.morph.dialect);
      this.form.controls['featureInput'].setValue(this.morph.feature);
    }

  }

  Save() {
    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }
}
