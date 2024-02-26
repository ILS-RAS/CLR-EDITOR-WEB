import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, never, startWith, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from '../../services/dictionary.service';
import { MorphModel } from '../../../../models/morphModel';
import { Helper } from '../../../../../utils';
import { EntryModel } from '../../../../models';

@Component({
  selector: 'app-lemma-selector',
  templateUrl: './lemma-selector.component.html',
  styleUrl: './lemma-selector.component.scss',
})
export class LemmaSelectorComponent extends BaseComponent {

  label: string = 'Выбрать лемму ...';
  form: UntypedFormGroup;
  isDisabled: boolean = true;
  result?:MorphModel;
  constructor(
    private dictionaryService: DictionaryService,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<LemmaSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.form = this.formBuilder.group({
      lemmaInput: new UntypedFormControl(''),
    });
  }

  ngOnInit() {
      this.form.controls['lemmaInput'].valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(val=>{
        this.dictionaryService.GetLemma(val).then((result: MorphModel[])=>{
          if(result && result.length > 0){
            this.result = result[0];
            this.isDisabled = false;
          }else{
            this.isDisabled = true;
          }
        })
      })
  }
  Save() {
    if(this.result){
      this.dictionaryService.SaveEntry(new EntryModel({
        morphId: this.result._id,
        projectId: this.dictionaryService.$currentDictionary.value?._id
      })).then((savedEntry)=>{
        this.dictionaryService.createEntryCard(savedEntry);
        this.dictionaryService.getEntries(this.dictionaryService.$currentDictionary.value?._id).then((items)=>{
          let view = this.dictionaryService.$entries.value?.find(i=>i._id == savedEntry._id);
          this.dictionaryService.$currentEntry.next(view);
        });
      });
    }
    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }
}
