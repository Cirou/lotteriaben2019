import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'firebase/app';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public pwd: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public user: User;
  public hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/app']);

    // this.authService
    //   .login(this.email.value, this.pwd.value)
    //   .then(data => {
    //     this.router.navigate(['/app']);
    //     console.log('Success!', data);
    //   }).catch(error => {
    //     this.router.navigate(['/login']);
    //     console.log('Something went wrong:', error.message);
    //   });
  }

}
