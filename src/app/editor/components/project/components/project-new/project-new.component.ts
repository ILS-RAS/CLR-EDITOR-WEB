import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { TaxonomyViewModel } from '../../../../models/taxonomyViewModel';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss',
})
export class ProjectNewComponent implements OnInit {
  works: TaxonomyViewModel[] = [];

  constructor(private projectService: ProjectService, private router: Router) {

  }
  ngOnInit(): void {
    this.projectService.loadAuthWorks().then(()=>{
      this.projectService.authWorks.subscribe((items) => {
        this.works = items;
      });
    });
  }
}
