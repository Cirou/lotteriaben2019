import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from "../../../../models/User";
import { UserService } from "../../services/user.service";

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
      "routerLink" :"home",
      "icon":"groups"
    },
    {
      "id": 2,
      "nome": "profilo",
      "descrizione": "Profilo",
      "routerLink" :"profile",
      "icon":"person"
    },
    {
      "id": 3,
      "nome": "search",
      "descrizione": "Cerca",
      "routerLink" :"search",
      "icon":"search"
    }
  ];

  navUtilsMenu = [
    {
      "id": 4,
      "nome": "settings",
      "descrizione": "Impostazioni",
      "routerLink" :"settings"
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(private userService: UserService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(
        userInfo => {
          this.userProfile = userInfo;
        },
        err => {
          console.log(err);
        });
  }

}
