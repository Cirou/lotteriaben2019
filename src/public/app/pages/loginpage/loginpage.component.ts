import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public email: string;
  public pwd: string;
  private user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  validateEmail(): boolean {
    return true;
  }

  validatePwd(): boolean {
    return true;
  }

  onSubmit() {
    // if (this.validateEmail && this.validatePwd) {
      // this.user = await this.authService.signInWithEmailAndPassword(this.email, this.pwd);
      // if (this.user != null) {
        this.router.navigate(['/app']);
    //   }
    // }
  }

}
