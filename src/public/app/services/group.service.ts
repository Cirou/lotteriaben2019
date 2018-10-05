import { Injectable } from '@angular/core';
import { Group } from '../../models/Group';
import { Message } from '../../models/Message';
import { Votation } from '../../models/Votation';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GroupService {

  private gruppoUrl: string = '/group/'
  private chatGruppoUrl: string = '/message/'
  private pollUrl: string = '/votation/'
  private sendMessageUrl: string = '/message'

  constructor(private http: Http) { }

  getGroupDetails(idGruppo: number): Observable<Group> {
    return this.http
      .get(this.gruppoUrl + idGruppo)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getGroupMessages(idGruppo: number): Observable<Message[]> {
    return this.http
      .get(this.chatGruppoUrl + idGruppo)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getPollOfTheDay(idGruppo: number): Observable<Votation> {
    return this.http
      .get(this.pollUrl + idGruppo)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  postGroupMessage(messageToSend: Message): Observable<Message> {

    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .post(this.sendMessageUrl, messageToSend, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
