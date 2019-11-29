import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

import { map, catchError } from 'rxjs/operators';
import { any } from 'bluebird';

@Injectable()
export class ImageService {

    private uploadUrl: string = !this.rootService.mocked ? '/upload' : '/public/assets/mock/upload.json?ref=';

    constructor(private http: HttpClient, private rootService: RootService) {}

    sendImage(uploadData: FormData):any {
        return this.http.post(this.uploadUrl, uploadData);
    }
}
