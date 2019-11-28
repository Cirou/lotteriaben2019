import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  private endpoint = "";

  constructor(
    private http: HttpClient
  ) { }

  sendImage(uploadData:FormData) {
  
      return this.http.post<any>(
        this.endpoint + '/upload', uploadData
      );
  }
}