import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  public loading = new BehaviorSubject(false);
  isLoading = this.loading.asObservable();

  constructor() { }

  public showLoader(value: boolean) {
    this.loading.next(value);
    if(this.loading.getValue() === true){
      setTimeout(()=>{
        this.loading.next(false);
      },5000);
    }
  }

}
