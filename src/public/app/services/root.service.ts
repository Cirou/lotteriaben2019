import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RootService {

  private _loggedUserId: string;
  private _mocked: boolean = true;

  constructor() {
  }

  public get loggedUserId(): string {
    return this._loggedUserId;
  }
  public set loggedUserId(value: string) {
    this._loggedUserId = value;
  }

  public get mocked(): boolean {
    return this._mocked;
  }
  public set mocked(value: boolean) {
    this._mocked = value;
  }

}
