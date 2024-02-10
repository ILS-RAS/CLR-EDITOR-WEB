import { Component } from '@angular/core';
import { BaseComponent } from '../../../components/base/base/base.component';
import { UserService } from '../user/services/user.service';
import { MetaService } from '../project/services/meta.service';
import { ProjectService } from '../project/services/project.service';
import { DictionaryService } from '../dictionary/services/dictionary.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    private metaService: MetaService,
    private projectService: ProjectService
  ) {
    super();
    this.userService.GetUsers();
    this.metaService.GetTaxonomy();
    this.projectService.GetProjects();
  }
}
