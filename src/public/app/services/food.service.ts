import { Injectable } from '@angular/core';
import { Cibo } from '../../../models/Cibo';
import { Ristorante } from '../../../models/Ristorante';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RiskExceptionConfigurationType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

@Injectable()
export class FoodService {

  private cibo: Cibo;
  private ciboUrl: string = 'public/assets/mock/getFoodDetails.json'
  private elencoCiboUrl: string = 'public/assets/mock/getFoodList.json'
  private elencoRistorantiUrl: string = 'public/assets/mock/getFoodPlaces.json'

  constructor(private http: Http) { }

  getFoodList(): Observable<Cibo[]> {
    return this.http
      .get(this.elencoCiboUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getFoodDetails(idCibo:string): Observable<Cibo> {
    return this.http
      .get(this.ciboUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getFoodPlaces(): Observable<Ristorante[]> {
    return this.http
      .get(this.elencoRistorantiUrl)
      .pipe(
        map((response: Response) => response.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

}
