import { Injectable } from '@angular/core';
import { Group } from '../../models/Group';
import { Message } from '../../models/Message';
import { GroupSuggestion } from '../../models/GroupSuggestion';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class GroupService {

  private gruppoUrl: string = !this.rootService.mocked ? '/group/' : '/public/assets/mock/getGroupDetails.json?ref=';
  private chatGruppoUrl: string = !this.rootService.mocked ? '/message/' : '/public/assets/mock/getGroupChat.json?ref=';
  private suggestionUrl: string = !this.rootService.mocked ? '/groupsuggestion/' : '/';
  private suggestionTSVUrl: string = !this.rootService.mocked ? '/groupsuggestiontsv/' : '/';
  private sendMessageUrl: string = !this.rootService.mocked ? '/message' : '/public/assets/mock/getGroupChat.json?ref=';
  private gruppoTuttiUrl: string = !this.rootService.mocked ? '/groups/' : '/public/assets/mock/getAllGroups.json?ref=';


  constructor(private http: Http, private rootService: RootService) { }

  getGroupDetails(idGruppo: number): Observable<Group> {
    return this.http
      .get(this.gruppoUrl + idGruppo)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getAllGroups(): Observable<Group[]> {
    return this.http
      .get(this.gruppoTuttiUrl)
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

  getSuggestion(idGruppo: number): Observable<GroupSuggestion> {
    return this.http
      .get(this.suggestionUrl + idGruppo)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getSuggestionByDate(idGruppo: number, date: string): Observable<GroupSuggestion[]> {
    return this.http
      .get(this.suggestionUrl + idGruppo + '/' + date)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getSuggestionTSV(id: number, date: string): Observable<string> {
    return this.http
      .get(this.suggestionTSVUrl + id + '/' + date)
      .pipe(
        map((response: Response) => response.text()),
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
