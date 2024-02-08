import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../base/base/base.component';
import { ProjectService } from '../../editor/components/project/services/project.service';
import { MetaService } from '../../editor/components/project/services/meta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  user?:any;
  public isAuthenticated = false;

  constructor(private _authService: AuthService, private projectService: ProjectService, private metaService: MetaService) {
    super();
    projectService.GetProjects();
    metaService.GetTaxonomy();
  }

  public ngOnInit(): void {  
    this._authService.isAuthenticated$.pipe(takeUntil(this.destroyed)).subscribe((item)=>{
      this.isAuthenticated = item;
      this.user = this._authService.getLoggedName();
    });
  }

  public logout(): void {
    this._authService.logout('/accipe');
  }

  toggleSideBar() {
    this.toggle.emit();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
