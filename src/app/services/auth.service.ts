import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModel } from '../editor/models/userModel';
import { BehaviorSubject, Observable, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy, OnInit {
  private headers = new HttpHeaders();

  private _isAuthenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get isAuthenticated$(): BehaviorSubject<boolean> {
    return this._isAuthenticated$;
  }

  ngOnInit(): void {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public ngOnDestroy(): void {}

  constructor(private router: Router, private httpClient: HttpClient) {
    this._isAuthenticated$.next(sessionStorage.getItem('token') != undefined);
  }

  public GetRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public Login(user: UserModel) {
    return this.httpClient
      .post(`${environment.Login}`, user, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          this.handleSignInResponse(res);
        })
      );
  }

  public Signup(user: UserModel) {
    return this.httpClient
      .post(`${environment.Signup}`, user, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public logout(redirect: string) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_id');
    this._isAuthenticated$.next(false);
    this.router.navigateByUrl(redirect);
  }

  private handleSignInResponse(resp: any): void {
    sessionStorage.setItem('token', resp.token);
    sessionStorage.setItem('_id', resp.user._id);
    this._isAuthenticated$.next(true);
  }
}
