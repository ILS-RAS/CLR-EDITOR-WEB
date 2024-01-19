import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Corpus Latino-Rossicum';
  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  constructor(private _authService: AuthService) {}

  public ngOnInit(): void {
    this._authService.isAuthenticated$
      .pipe()
      .subscribe(
        (isAuthenticated: boolean) => {
          this.isAuthenticated = isAuthenticated;
          if(this.isAuthenticated){
            this.title = `CORPUS LATINO-ROSSICUM [${sessionStorage.getItem('user')}]`;
          }else{
            this.title = 'CORPUS LATINO-ROSSICUM';
          }
        }
      );
  }

  public logout(): void {
    this._authService.logout('/');
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }
}
