import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  createUser(email: string, passwaord: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, passwaord);
  }

  singIn(email: string, passwaord: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, passwaord);
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  hasSession(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }
}
