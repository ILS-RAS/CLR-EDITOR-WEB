import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { UserModel } from '../../editor/models/userModel';
import { AppConfig } from '../../constants/app-config';
import { BaseComponent } from '../base/base/base.component';
import { ProjectService } from '../../editor/components/project/services/project.service';
import { MetaService } from '../../editor/components/project/services/meta.service';
import { UserService } from '../../editor/components/user/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  public title?: string;
  public loginValid = true;
  public username?: string;
  public password?: string;
  public sum?: number;
  public firstRandom:number = 0;
  public secondRandom:number = 0;
  private readonly returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    super();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this.firstRandom = _authService.GetRandomNumber(15);
    this.secondRandom = _authService.GetRandomNumber(15);
  }

  public ngOnInit(): void {
    this.title = AppConfig.AppFullTitle;
    this._authService.isAuthenticated$.pipe(
      filter((isAuthenticated: boolean) => isAuthenticated)
    ).pipe(takeUntil(this.destroyed)).subscribe( _ => this._router.navigateByUrl(this.returnUrl));
  }

  public isCorrect():boolean{
    return this.sum == this.firstRandom + this.firstRandom;
  }

  public onSubmit(): void {

    this.loginValid = true;
    var user: UserModel = new UserModel({});
    user.email = this.username;
    user.password = this.password;

    this._authService.Login(user).pipe(
      take(1)
    ).pipe(takeUntil(this.destroyed)).subscribe({
      next: _ => {
        this.loginValid = true;
        this._router.navigateByUrl('/');
      },
      error: _ => this.loginValid = false
    });
  }
}