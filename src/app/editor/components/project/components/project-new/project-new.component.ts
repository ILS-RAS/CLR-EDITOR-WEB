import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { TaxonomyViewModel } from '../../../../models/taxonomyViewModel';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss',
})
export class ProjectNewComponent implements OnInit {
  works: TaxonomyViewModel[] = [];

  constructor(private projectService: ProjectService, private router: Router, 
    private _bottomSheetRef: MatBottomSheetRef<ProjectNewComponent>) {

  }
  ngOnInit(): void {
    this.projectService.loadAuthWorks().then(()=>{
      this.projectService.authWorks.subscribe((items) => {
        this.works = items;
      });
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
