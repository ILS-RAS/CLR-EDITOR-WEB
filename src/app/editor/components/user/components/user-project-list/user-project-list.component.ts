import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UserModel } from '../../../../models';
import { takeUntil } from 'rxjs';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'app-user-project-list',
  templateUrl: './user-project-list.component.html',
  styleUrl: './user-project-list.component.scss'
})
export class UserProjectListComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() user?: UserModel;
  projects?: any;
  displayedColumns: string[] = ['code', 'desc', 'type'];
  constructor(private projectService: ProjectService){
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.projectService.$projects.pipe(takeUntil(this.destroyed)).subscribe(projects=>{
      this.projects = projects.filter(i=>i.creatorId == this.user?._id).sort((a, b) => a.code!.localeCompare(b.code!));
    });
  }
  
  ngOnInit(): void {
    
  }
}
