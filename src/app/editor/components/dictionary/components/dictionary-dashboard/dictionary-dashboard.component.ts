import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryBuilderComponent } from '../dictionary-builder/dictionary-builder.component';
import { ProjectModel } from '../../../../models';
import { DictionaryService } from '../../services/dictionary.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-dashboard',
  templateUrl: './dictionary-dashboard.component.html',
  styleUrl: './dictionary-dashboard.component.scss',
})
export class DictionaryDashboardComponent extends BaseComponent implements OnInit{
  public drawerOpened: boolean = true;
  public dictionary?: ProjectModel;
  constructor(private dialog: MatDialog, private dictionaryService: DictionaryService, private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$currentDictionary.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.dictionary = item;
    });
  }

  Close() {
    this.dictionaryService.$currentDictionary.next(undefined);
    this.router.navigateByUrl('/');
  }

  BuildDictionary() {
    this.dialog.open(DictionaryBuilderComponent, {
      width: '1200px',
      data: this.dictionary,
    });
  }
}
