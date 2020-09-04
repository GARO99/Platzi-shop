import { Injectable } from '@angular/core';
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
}
