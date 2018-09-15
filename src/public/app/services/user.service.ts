import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { UserTip } from '../../../models/UserTip';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private user: User;
  private userUrl: string = 'public/assets/mock/getUserProfile.json'
  private userTipUrl: string = 'public/assets/mock/getUserTip.json'

  postUserProfile() {
    return '{result: "OK"}';
  }

  getUserProfile(): Observable<User> {
    return this.http
      .get(this.userUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getUserLoginTip(): Observable<UserTip>{
    return this.http
      .get(this.userTipUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
