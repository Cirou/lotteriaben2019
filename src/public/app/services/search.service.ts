import { Injectable } from '@angular/core';
import { Group } from '../../models/Group';
import { User } from '../../models/User';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SearchService {

  private searchUserUrl: string = 'public/assets/mock/getGroupDetails.json'
  private searchGroupUrl: string = 'public/assets/mock/getGroupDetails.json'

  constructor(private http: Http) { }

  getUsersByName(name:string): Observable<User[]> {
    return this.http
    .get(this.searchUserUrl)
    .pipe(
      map((response: Response) => response.json()),
      catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getGroupsByName(name:string): Observable<Group[]> {
    return this.http
      .get(this.searchGroupUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }
}
