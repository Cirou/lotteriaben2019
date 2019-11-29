import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RootService {

  private _logged: boolean = false;
  private _mocked: boolean = false;

  constructor() {
  }

  public get logged(): boolean {
    return this._logged;
  }
  public set logged(value: boolean) {
    this._logged = value;
  }

  public get mocked(): boolean {
    return this._mocked;
  }
  public set mocked(value: boolean) {
    this._mocked = value;
  }

}
