import { Component, OnInit,  } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';
import { RootService } from '../../services/root.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public email: FormControl = new FormControl('', [Validators.required]);
  public pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public stayLogged = false;
  public user: User;
  public hide: boolean = true;


  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private rootService: RootService) { }

  ngOnInit() {
    this.rootService.loggedUserId = this.cookieService.get('pausappranzo_stay_logged_id');
    console.log(this.rootService.loggedUserId);
    if(Number(this.rootService.loggedUserId) > 0){
      this.goToHome();
    }
  }

  ngOnAfterContentInit(){

  }

  goToHome(){
    this.router.navigate(['/app']);
  }

  login() {

    this.rootService.loggedUserId = this.email.value;

    if(this.stayLogged){
      this.cookieService.set('pausappranzo_stay_logged_id', this.email.value,  10000)
    }

    this.goToHome();
  }

}
