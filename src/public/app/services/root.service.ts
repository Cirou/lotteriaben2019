import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Votation } from '../../models/Votation';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RootService {

  private _loggedUserId: string;
  private _loggedUser: User;
  private _mocked: boolean = false;
  private _votations: Votation[] = new Array;

  constructor(private cookieService:CookieService) {
    this.loggedUserId = this.cookieService.get('pausappranzo_stay_logged_id');
   }

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

  public get mocked(): boolean {
    return this._mocked;
  }
  public set mocked(value: boolean) {
    this._mocked = value;
  }

  public get votations(): Votation[] {
    return this._votations;
  }
  public set votations(value: Votation[]) {
    this._votations = value;
  }

}
