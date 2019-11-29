import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class UserService {

  private getValidUserUrl: string = !this.rootService.mocked ? '/user/' : '/public/assets/mock/getValidUserUrl.json?ref=';

  constructor(private http: Http, private rootService: RootService) { }

  getValidUser(): Observable<User[]> {
    return this.http
      .get(this.getValidUserUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error || 'Server error')));
  }

  postUser(pwd: string): Observable<User> {
    const httpOptions = {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    return this.http.post(this.getValidUserUrl, {'pwd': pwd}, httpOptions).pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error || 'Server error'))
    );
}

}
