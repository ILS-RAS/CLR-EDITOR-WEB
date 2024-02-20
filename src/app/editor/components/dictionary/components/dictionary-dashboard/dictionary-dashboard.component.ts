import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DictionaryBuilderComponent } from '../dictionary-builder/dictionary-builder.component';
import { ProjectModel } from '../../../../models';
import { DictionaryService } from '../../services/dictionary.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from '../../../../../services/ui.service';

@Component({
  selector: 'app-dictionary-dashboard',
  templateUrl: './dictionary-dashboard.component.html',
  styleUrl: './dictionary-dashboard.component.scss',
})
export class DictionaryDashboardComponent extends BaseComponent implements OnInit{
  public drawerOpened?: boolean;
  public dictionary?: ProjectModel;
  constructor(private dialog: MatDialog, private dictionaryService: DictionaryService, private uiService: UiService, private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.dictionaryService.$currentDictionary.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.dictionary = item;
    });
    this.uiService.$wordPanelOpened.pipe(takeUntil(this.destroyed)).subscribe(state=>{
      this.drawerOpened = state;
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
