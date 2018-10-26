import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';
import { Food } from '../../models/Food';
import { Votation } from '../../models/Votation';

@Injectable()
export class VotationService {

  constructor(private http: Http, private rootService: RootService) { }

  private votationByDateUrl: string = !this.rootService.mocked ? '/votation/' : '/';

  getVotationByDate(id: number, date: string): Observable<Votation[]>{
    return this.http
    .get(this.votationByDateUrl + id + '/' + date)
    .pipe(
      map((response: Response) => response.json()),
      catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }
}
