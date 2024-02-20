import { Component, Inject, OnInit } from '@angular/core';
import { ProjectModel } from '../../../../models';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../../project/services/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { takeUntil } from 'rxjs';
import { ProjectType } from '../../../../enums/projectType';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionary-selector',
  templateUrl: './dictionary-selector.component.html',
  styleUrl: './dictionary-selector.component.scss'
})
export class DictionarySelectorComponent extends BaseComponent implements OnInit {
  projects: ProjectModel[] = [];

  selected = new FormControl([Validators.required]);

  isDisabled: boolean = true;

  label: string = 'Выбрать словарь ...';

  constructor(
    private projectService: ProjectService,
    private dictionaryService: DictionaryService,
    public dialogRef: MatDialogRef<DictionarySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectModel,
    private router: Router,
  ) {
    super();

  }
  
  ngOnInit(): void {
    this.projectService.$projects.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.projects = items.filter(i=>i.projectType == ProjectType.Dictionary).sort((a, b) => a.code!.localeCompare(b.code!));
    });
  }

  Cancel() {
    this.dialogRef.close();
  }

  Open() {
    let selectedProject = this.selected.value as unknown as ProjectModel;
    if(selectedProject){
      this.dictionaryService.InitContext(selectedProject);
      this.dictionaryService.GetDictionaryIndeces(selectedProject._id);
      this.Cancel();
      this.router.navigateByUrl('/lexicon');
    }
  }

  Change() {
    this.isDisabled = this.selected.value == undefined;
    if (!this.isDisabled) {
      this.label = 'Код проекта';
    }
  }
}
