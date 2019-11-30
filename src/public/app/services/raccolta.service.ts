import { Injectable } from '@angular/core';
import { Raccolta } from '../../models/Raccolta';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class RaccoltaService {

    private getAllRaccoltaUrl: string = !this.rootService.mocked ? '/raccolta/' : '/public/assets/mock/getAllPremi.json?ref=';
    private raccoltaUrl: string = !this.rootService.mocked ? '/raccolta/' : '/public/assets/mock/getPremi.json?ref=';

    constructor(private http: Http, private rootService: RootService) {}

    getRaccolta(): Observable<Raccolta> {
        return this.http.get(this.getAllRaccoltaUrl).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    saveRaccolta(raccolta: Raccolta): Observable<Raccolta> {
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(this.raccoltaUrl, raccolta, httpOptions).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

}
