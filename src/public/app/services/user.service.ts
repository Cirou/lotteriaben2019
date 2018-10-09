import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Tip } from '../../models/Tip';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';
import { Votation } from '../../models/Votation';

@Injectable()
export class UserService {

  constructor(private http: Http, private rootService: RootService) { }

  private userUrl: string = !this.rootService.mocked ? '/user/' : '/public/assets/mock/getUserProfile.json?ref=';
  private userTipUrl: string = !this.rootService.mocked ? '/tip/' : '/public/assets/mock/getUserTip.json?ref=';
  private userTipMaxIdUrl: string = !this.rootService.mocked ? '/tipmaxid' : '/public/assets/mock/getUserMaxTip.json?ref=';
  private sendUserVotationUrl: string = !this.rootService.mocked ? '/userpreferences' : '/public/assets/mock/getUserMaxTip.json?ref=';

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

  postUserPreferences(preferences: Votation[]): Observable<Votation[]> {

    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .post(this.sendUserVotationUrl, preferences, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
