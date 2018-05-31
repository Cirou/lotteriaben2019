import { Injectable } from '@angular/core';
import { Gruppo } from '../../../models/Gruppo';
import { Chat } from '../../../models/Chat';
import { Poll } from '../../../models/Poll';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GroupService {

  private gruppo: Gruppo;
  private gruppoUrl: string = 'public/assets/mock/getGroupDetails.json'
  private chatGruppoUrl: string = 'public/assets/mock/getGroupChat.json'
  private pollUrl: string = 'public/assets/mock/getPollOfTheDay.json'

  constructor(private http: Http) { }

  getGroupDetails(idGruppo:string): Observable<Gruppo> {
    return this.http
      .get(this.gruppoUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getGroupChat(idGruppo:string): Observable<Chat> {
    return this.http
      .get(this.chatGruppoUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getPollOfTheDay(idGruppo:string): Observable<Poll> {
    return this.http
      .get(this.pollUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
