import { Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable()
export class RootService {

  private _loggedUserId: string;
  private _loggedUser: User;

  constructor() { }

  public get loggedUser(): User {
    return this._loggedUser;
  }
  public set loggedUser(value: User) {
    this._loggedUser = value;
  }

  public get loggedUserId(): string {
    return this._loggedUserId;
  }
  public set loggedUserId(value: string) {
    this._loggedUserId = value;
  }

}