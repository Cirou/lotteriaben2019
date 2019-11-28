import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Votation } from '../../models/Votation';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class RootService {

  private _loggedUserId: string;
  private _loggedUser: User;
  private _mocked: boolean = false;
  private _votations: Votation[] = new Array;

  constructor(private cookieService: CookieService) {
    this.loggedUserId = this.cookieService.get('lotteriaben2019_stay_logged_id');
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


  checkLoggedUser(router: Router, userService: UserService): any {
    if (!this.loggedUserId) {
      router.navigate(['/login']);
      return;
    } else if (this.loggedUserId && !this.loggedUser) {
      userService.getUserProfile(this.loggedUserId)
        .subscribe(
          userInfo => {
            this.loggedUser = userInfo[0];
            console.log(this.loggedUser);
          },
          err => {
            console.log(err);
          }
        );
    }
    return;
  }

}
