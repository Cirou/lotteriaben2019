import { Injectable } from '@angular/core';
import { Cibo } from '../../../models/Cibo';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FoodService {

  private cibo: Cibo;
  private ciboUrl: string = 'public/assets/mock/getFoodDetails.json'

  constructor(private http: Http) { }

  getFoodDetails(idCibo:string): Observable<Cibo> {
    return this.http
      .get(this.ciboUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
