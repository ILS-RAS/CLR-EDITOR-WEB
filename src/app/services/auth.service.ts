import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../editor/models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy, OnInit {

  private headers = new HttpHeaders();

  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  public get isAuthenticated$(): BehaviorSubject<boolean> {
    return this._isAuthenticated$;
  }
  
  ngOnInit(): void {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public ngOnDestroy(): void {

  }

  constructor(private router: Router, private httpClient: HttpClient) {
    this._isAuthenticated$.next(sessionStorage.getItem("token") != undefined);
  }

  public GetRandomNumber(max:number):number
  {
    return Math.floor(Math.random() * max);
  }

  public Login(user: User){
    return this.httpClient
    .post(`${environment.Login}`, user, {
      headers: this.headers,
    })
    .pipe(
      map((res) => {
        this.handleSignInResponse(res)
      }),
    );;
  }

  public logout(redirect: string){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user')
    this._isAuthenticated$.next(false);
    this.router.navigateByUrl(redirect);
  }

  private handleSignInResponse(resp: any): void {
    sessionStorage.setItem('token', resp.token);
    sessionStorage.setItem('user', resp.user.email)
    this._isAuthenticated$.next(true);
  }
}