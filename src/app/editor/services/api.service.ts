import { Injectable, OnInit } from '@angular/core';
import { BaseModel } from '../models/baseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends BaseModel> implements OnInit {

  private headers = new HttpHeaders();
  private token: string | null | undefined;

  constructor(private httpClient: HttpClient, private errorService: ErrorService) { 

    this.token = sessionStorage.getItem('token');
   
    if(this.token){
      this.headers = this.getCustomHeaders(this.token);
    }
  }
  getCustomHeaders(token:string): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', token);
    return headers;
  }
  ngOnInit(): void {

  }

  findAll(item: T) {
    return this.httpClient.get(`${environment.API}${item.apiType}`, {
      headers: this.headers
    }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((e: any) => throwError(this.errorService.errorHandler(e)))
    );
  }

  findOne(item: T) {
    return this.httpClient
      .get(`${environment.API}${item.apiType}/${item._id}`, {
        headers: this.headers
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  findByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${environment.API}${item.apiType}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  findPageByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${environment.API}${item.apiType}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  countByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${environment.API}${item.apiType}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  remove(item: T) {
    return this.httpClient
      .delete(`${environment.API}${item.apiType}/${item._id}`, {
        headers: this.headers
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  save(item: T, path:string) {
    if (item._id !== undefined) {
      return this.httpClient
        .put(`${environment.API}${path}/${item._id}`, item, {
          headers: this.headers,
        })
        .pipe(
          map((res) => {
            return res;
          }),
          catchError((e: any) => throwError(this.errorService.errorHandler(e)))
        );
    } else {
      return this.httpClient
        .post(`${environment.API}${path}`, item, {
          headers: this.headers,
        })
        .pipe(
          map((res) => {
            return res;
          }),
          catchError((e: any) => throwError(this.errorService.errorHandler(e)))
        );
    }
  }
}
