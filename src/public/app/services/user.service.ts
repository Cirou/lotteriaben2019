import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class UserService {

  private getAllUsersUrl: string = !this.rootService.mocked ? '/user/' : '/public/assets/mock/getAllUsers.json?ref=';
  
  constructor(private http: Http, private rootService: RootService) { }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get(this.getAllUsersUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error || 'Server error')));
  }

}
