import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';


/*
  Generated class for the ProvidersAuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public user: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
    console.log('Hello ProvidersAuthenticationProvider Provider');
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential>{
    // TODO: setting the persistence does not yet work...
    // this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    let authPromise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    
    authPromise.then(()=>{
      this.afAuth.authState.subscribe((user)=>{
        this.user.next(user);
      });
    }).catch(
      (error)=>{
        throw error;
      }
    );

    return authPromise;
  }

  createUser(email: string, password: string): Promise<firebase.auth.UserCredential>{
    let createUserPromise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return createUserPromise;
  }

  logout(): void{
    this.afAuth.auth.signOut();
    this.user = null;
  }
}
