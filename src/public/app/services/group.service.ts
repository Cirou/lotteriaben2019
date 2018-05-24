import { Injectable } from '@angular/core';
import { Gruppo } from '../../../models/Gruppo';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GroupService {

  private gruppo: Gruppo;
  private gruppoUrl: string = 'public/assets/mock/getGroupDetails.json'

  constructor(private http: Http) { }

  getGroupDetails(idGruppo:string): Observable<Gruppo> {
    return this.http
      .get(this.gruppoUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
