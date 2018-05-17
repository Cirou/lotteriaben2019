import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {

  title = "app";

  mobileQuery: MediaQueryList;

  navMenu = [
    {
      "id": 1,
      "nome": "home",
      "descrizione": "I miei gruppi",
      "routerLink" :"/"
    },
    {
      "id": 2,
      "nome": "profilo",
      "descrizione": "Profilo",
      "routerLink" :"/profile"
    }
  ];

  navUtilsMenu = [
    {
      "id": 3,
      "nome": "settings",
      "descrizione": "Impostazioni",
      "routerLink" :"/settings"
    },
    {
      "id": 4,
      "nome": "Logout",
      "descrizione": "Esci",
      "routerLink" :"/logout"
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

}
