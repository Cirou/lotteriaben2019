import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ImageService {

    private uploadUrl: string = !this.rootService.mocked ? '/upload' : '/public/assets/mock/upload.json?ref=';

    constructor(private http: HttpClient, private rootService: RootService) {}

    sendImage(uploadData: FormData) {
        return this.http.post(this.uploadUrl, uploadData).pipe(
            map((response: any) => response.json()),
            catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
}
