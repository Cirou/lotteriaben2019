import { Injectable } from '@angular/core';
import { Group } from '../../../models/Group';
import { Message } from '../../../models/Message';
import { Votation } from '../../../models/Votation';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GroupService {

  private gruppo: Group;
  private gruppoUrl: string = 'public/assets/mock/getGroupDetails.json'
  private chatGruppoUrl: string = 'public/assets/mock/getGroupChat.json'
  private pollUrl: string = 'public/assets/mock/getPollOfTheDay.json'

  constructor(private http: Http) { }

  getGroupDetails(idGruppo:number): Observable<Group> {
    return this.http
      .get(this.gruppoUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getGroupMessages(idGruppo:number): Observable<Message[]> {
    return this.http
      .get(this.chatGruppoUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getPollOfTheDay(idGruppo:number): Observable<Votation> {
    return this.http
      .get(this.pollUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
