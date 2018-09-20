import { Injectable } from '@angular/core';
import { Food } from '../../../models/Food';
import { Location } from '../../../models/Location';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FoodService {

  private cibo: Food;
  private ciboUrl: string = 'public/assets/mock/getFoodDetails.json'
  private elencoCiboUrl: string = 'public/assets/mock/getFoodList.json'
  private elencoRistorantiUrl: string = 'public/assets/mock/getFoodPlaces.json'

  constructor(private http: Http) { }

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
