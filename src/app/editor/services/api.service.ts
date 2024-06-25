import { Injectable, OnInit } from '@angular/core';
import { BaseModel } from '../models/baseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends BaseModel> implements OnInit {

  private headers = new HttpHeaders();
  private token: string | null | undefined;

  constructor(private httpClient: HttpClient) { 

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

  findAll(item: T, path:string) {
    return this.httpClient.get(`${environment.API}${path}`, {
      headers: this.headers
    }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((e: any) => throwError(console.log(e)))
    );
  }

  findOne(item: T, path:string) {
    return this.httpClient
      .get(`${environment.API}${path}/${item._id}`, {
        headers: this.headers
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  findByQuery(item: T, query: string, path:string) {
    return this.httpClient
      .get(`${environment.API}${path}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  findPageByQuery(item: T, query: string, path:string) {
    return this.httpClient
      .get(`${environment.API}${path}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  countByQuery(item: T, query: string, path:string) {
    return this.httpClient
      .get(`${environment.API}${path}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  remove(item: T, path:string) {
    return this.httpClient
      .delete(`${environment.API}${path}/${item._id}`, {
        headers: this.headers
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  removeByQuery(item: T, query: string,  path:string) {
    return this.httpClient
      .delete(`${environment.API}${path}/${0}?params=${query}`, {
        headers: this.headers
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
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
          catchError((e: any) => throwError(console.log(e)))
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
          catchError((e: any) => throwError(console.log(e)))
        );
    }
  }

  patch(item: T, path:string) {
    return this.httpClient
      .patch(`${environment.API}${path}/${item._id}`, item, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }

  getById(id: string, path:string) {
    return this.httpClient
      .get(`${environment.API}${path}/${id}`, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(console.log(e)))
      );
  }
}
