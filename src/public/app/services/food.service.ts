import { Injectable } from '@angular/core';
import { Food } from '../../models/Food';
import { Location } from '../../models/Location';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class FoodService {

  private ciboUrl: string = !this.rootService.mocked ? '/food/1' : '/';
  private elencoCiboUrl: string = !this.rootService.mocked ? '/foods/' : '/';
  private elencoRistorantiUrl: string = !this.rootService.mocked ? '/locations/' : '/';

  constructor(private http: Http, private rootService: RootService) { }

  getFoodList(): Observable<Food[]> {
    return this.http
      .get(this.elencoCiboUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getFoodDetails(idCibo:number): Observable<Food> {
    return this.http
      .get(this.ciboUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getFoodPlaces(): Observable<Location[]> {
    return this.http
      .get(this.elencoRistorantiUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
