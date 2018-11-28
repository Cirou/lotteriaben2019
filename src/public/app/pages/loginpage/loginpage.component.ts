import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';
import { RootService } from '../../services/root.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';

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
  userList: User[] = new Array;

  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private rootService: RootService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.rootService.loggedUserId = this.cookieService.get('pausappranzo_stay_logged_id');
    console.log(this.rootService.loggedUserId);

    //if(Number(this.rootService.loggedUserId) > 0){
    //  this.goToHome();
    //}

  }

  goToHome() {
    this.router.navigate(['/app']);
  }

  login() {

    this.rootService.loggedUserId = this.email.value;
    this.cookieService.set('pausappranzo_stay_logged_id', this.email.value, 10000)

    this.userService.getAllUsers().subscribe(
      users => {
        let found = false;
        users.forEach(user => {          
          if (user.id == Number(this.rootService.loggedUserId)) {
           found = true;
            return;
          }
        });
        if (found) {
          this.goToHome();
        }
        else {
          console.log("Utente non registrato");     
          this.openLoginPopup();   
        }        
      },
      err => {
        console.log(err);
      });


  }

  openLoginPopup() {
    this.cookieService.set('pausappranzo_daily_login_done', 'true', 1);
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      autoFocus: false,
      height: "80%",
      width: "600px",
      data: {

      }
    });
  }
}
