import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private _authService: AuthService) {}

  public ngOnInit(): void {  
    this._authService.isAuthenticated$.subscribe((item)=>{
      this.isAuthenticated = item;
    })
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
