import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public pwd = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public user = {};
  public hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // this.authService.signInWithEmailAndPassword(this.email.value, this.pwd.value)
    // .then(function(res){
    //   this.authService.userDetails != null
    //   if (res != null) {
        this.router.navigate(['/app']);
    //   }
    // }).catch(function(){
    //   //OPEN POPUP
    // });
  }

}
