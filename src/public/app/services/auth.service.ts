import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
  }

  async createUserWithEmailAndPassword(email:string, password:string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code, error.message)
    });
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
      return firebaseUser;
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code, error.message)
      return null;
    });
  }

  async isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  async signout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

}
