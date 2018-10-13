import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from "../../../models/User";
import { UserService } from "../../services/user.service";
import { RootService } from '../../services/root.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {

  title = "app";
  userProfile: User = new User;
  mobileQuery: MediaQueryList;

  navMenu = [
    {
      "id": 1,
      "nome": "home",
      "descrizione": "I miei gruppi",
      "routerLink": "home",
      "icon": "groups"
    },
    {
      "id": 2,
      "nome": "profilo",
      "descrizione": "Profilo",
      "routerLink": "profile",
      "icon": "person"
    }
  ];

  navUtilsMenu = [
    {
      "id": 4,
      "nome": "settings",
      "descrizione": "Impostazioni",
      "routerLink": "settings"
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(private userService: UserService,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private router: Router,
      private rootService: RootService,
      private cookieService: CookieService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userService.getUserProfile(this.rootService.loggedUserId)
      .subscribe(
        userInfo => {
          this.userProfile = userInfo[0];
          this.rootService.loggedUser = userInfo[0];
          console.log(this.userProfile);
        },
        err => {
          console.log(err);
        });
  }

  logout() {
    this.cookieService.delete('pausappranzo_stay_logged_id');
    this.router.navigate(['/logout']);
  }

}
