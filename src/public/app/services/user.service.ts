import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Tip } from '../../models/Tip';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';
import { Votation } from '../../models/Votation';
import { UserGroup } from '../../models/UserGroup';

@Injectable()
export class UserService {

  constructor(private http: Http, private rootService: RootService) { }

  private userUrl: string = !this.rootService.mocked ? '/user/' : '/public/assets/mock/getUserProfile.json?ref=';
  private usersUrl: string = !this.rootService.mocked ? '/users/' : '/public/assets/mock/getUserProfile.json?ref=';
  private userTipUrl: string = !this.rootService.mocked ? '/tip/' : '/public/assets/mock/getUserTip.json?ref=';
  private userTipMaxIdUrl: string = !this.rootService.mocked ? '/tipmaxid' : '/public/assets/mock/getUserMaxTip.json?ref=';
  private sendUserVotationUrl: string = !this.rootService.mocked ? '/votation' : '/public/assets/mock/postUserVotation.json?ref=';
  private getUserVotationUrl: string = !this.rootService.mocked ? '/votation/' : '/public/assets/mock/getUserVotation.json?ref=';
  private sendUserGroupUrl: string = !this.rootService.mocked ? '/usergroup' : '/public/assets/mock/postUserGroup.json?ref=';



  postUserProfile(user: User): Observable<User> {
    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .post(this.userUrl, user, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getUserProfile(id: string): Observable<User> {
    return this.http
      .get(this.userUrl + id)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get(this.usersUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getUserLoginTip(id: string): Observable<Tip> {
    return this.http
      .get(this.userTipUrl + id)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getTipMaxId(): Observable<Tip> {
    return this.http
      .get(this.userTipMaxIdUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  postUserVotation(preferences: Votation[]): Observable<Votation[]> {

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

  getUserVotation(id: string): Observable<Votation[]> {
    return this.http
      .get(this.getUserVotationUrl + id)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  postUserGroup(usergroup: UserGroup): Observable<UserGroup> {

    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .post(this.sendUserGroupUrl, usergroup, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  deleteUserGroup(usergroup: UserGroup): Observable<UserGroup> {

    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .put(this.sendUserGroupUrl, usergroup, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
