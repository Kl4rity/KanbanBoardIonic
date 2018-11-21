import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';


/*
  Generated class for the ProvidersAuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public user: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged(user => {
      this.user.next(user);
    });
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential>{
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    let authPromise = this.afAuth.auth.signInWithEmailAndPassword(email, password);

    return authPromise;
  }

  createUser(email: string, password: string): Promise<firebase.auth.UserCredential>{
    let createUserPromise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return createUserPromise;
  }

  sendPasswordReset(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void>{
    return this.afAuth.auth.signOut();
  }
}
