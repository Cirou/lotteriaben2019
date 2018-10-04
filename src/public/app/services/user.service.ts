import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Tip } from '../../models/Tip';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private userUrl: string = '/user/'
  private userTipUrl: string = '/tip/'
  private userTipMaxIdUrl: string = '/tipmaxid'

  postUserProfile() {
    return '{result: "OK"}';
  }

  getUserProfile(id:string): Observable<User> {
    return this.http
      .get(this.userUrl + id)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getUserLoginTip(id:string): Observable<Tip>{
    return this.http
      .get(this.userTipUrl + id)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getTipMaxId(): Observable<Tip>{
    return this.http
      .get(this.userTipMaxIdUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
