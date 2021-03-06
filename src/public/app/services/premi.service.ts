import { Injectable } from '@angular/core';
import { Premi } from '../../models/Premi';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { RootService } from './root.service';

@Injectable()
export class PremiService {
    private getAllPremiUrl: string = !this.rootService.mocked ? '/premi/' : '/public/assets/mock/getAllPremi.json?ref=';
    private premiUrl: string = !this.rootService.mocked ? '/premi/' : '/public/assets/mock/getPremi.json?ref=';
    private premiPosizioneUrl: string = !this.rootService.mocked ? '/premi/posizione/' : '/public/assets/mock/getPremi.json?ref=';
    private getAllPremiNoImagesUrl: string = !this.rootService.mocked ? '/preminoimages' : '/public/assets/mock/getPremi.json?ref=';
    private getLastPremiUrl: string = !this.rootService.mocked ? '/premilast' : '/public/assets/mock/getAllPremi.json?ref=';
    private getPartialPremiUrl: string = !this.rootService.mocked ? '/premipartial/' : '/public/assets/mock/getAllPremi.json?ref=';

    constructor(private http: Http, private rootService: RootService) {}

    getPremioById(idPremio: number): Observable<Premi> {
        return this.http.get(this.premiUrl + idPremio).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    getPremioByPosizione(idPosizione: number): Observable<Premi> {
        return this.http.get(this.premiPosizioneUrl + idPosizione).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    getPartialPremi(startFrom: number): Observable<Premi[]> {
        return this.http.get(this.getPartialPremiUrl + startFrom).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    getAllPremi(): Observable<Premi[]> {
        return this.http.get(this.getAllPremiUrl).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    getAllPremiNoImages(): Observable<Premi[]> {
        return this.http.get(this.getAllPremiNoImagesUrl).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    getLastPremi(): Observable<Premi[]> {
        return this.http.get(this.getLastPremiUrl).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    postPremio(premio: Premi): Observable<Premi> {
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(this.premiUrl, premio, httpOptions).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    putPremio(premio: Premi): Observable<Premi> {
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        return this.http.put(this.premiUrl, premio, httpOptions).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    deletePremio(idPremio: number): Observable<Premi> {
        return this.http.delete(this.premiUrl + idPremio).pipe(
            map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }

    posizioneExists(idPosizione: number): boolean {
        this.getPremioByPosizione(idPosizione).subscribe(
            res => {
                console.log(res);
                res.id ? true : false;
            },
            err => {
                console.log(err);
                return true;
            }
        );

        return true;
    }
}
