import { Injectable } from '@angular/core';
import { Premi } from '../../models/Premi';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class PremiService {

  private premiUrl: string = !this.rootService.mocked ? '/premi/' : '/public/assets/mock/getGroupDetails.json?ref=';

  constructor(private http: Http, private rootService: RootService) { }

  getPremioById(idPremio: number): Observable<Premi> {
    return this.http
      .get(this.premiUrl + idPremio)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getAllPremi(): Observable<Premi[]> {
    return this.http
      .get(this.premiUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  postPremio(premio: Premi): Observable<Premi> {
    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .post(this.premiUrl, premio, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  deletePremio(premio: Premi): Observable<Premi> {

    const httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    };

    return this.http
      .put(this.premiUrl, premio, httpOptions)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
