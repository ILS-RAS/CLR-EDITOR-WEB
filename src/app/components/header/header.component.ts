import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectModel } from '../../editor/models/projectModel';
import { ProjectService } from '../../editor/components/project/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  public currentProject?: ProjectModel;
  constructor(private _authService: AuthService, private projectService: ProjectService) {}

  public ngOnInit(): void {  
    this._authService.isAuthenticated$.subscribe((item)=>{
      this.isAuthenticated = item;
    });
    this.projectService.currentProject.subscribe(item =>{
      this.currentProject = item;
    });
  }

  public logout(): void {
    this._authService.logout('/accipe');
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  toggleSideBar() {
    this.toggle.emit();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
