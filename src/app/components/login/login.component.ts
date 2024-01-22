import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { User } from '../../editor/models/user';
import { AppConfig } from '../../constants/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public title?: string;
  public loginValid = true;
  public username?: string;
  public password?: string;
  public sum?: number;
  public firstRandom:number = 0;
  public secondRandom:number = 0;
  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this.firstRandom = _authService.GetRandomNumber(15);
    this.secondRandom = _authService.GetRandomNumber(15);
  }

  public ngOnInit(): void {
    this.title = AppConfig.AppFullTitle;
    this._authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated),
      takeUntil(this._destroySub$)
    ).subscribe( _ => this._router.navigateByUrl(this.returnUrl));
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public isCorrect():boolean{
    return this.sum == this.firstRandom + this.firstRandom;
  }

  public onSubmit(): void {
    this.loginValid = true;
    var user: User = new User();
    user.email = this.username;
    user.password = this.password;

    this._authService.Login(user).pipe(
      take(1)
    ).subscribe({
      next: _ => {
        this.loginValid = true;
        this._router.navigateByUrl('/');
      },
      error: _ => this.loginValid = false
    });
  }
}