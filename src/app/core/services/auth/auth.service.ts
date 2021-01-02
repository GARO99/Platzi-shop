import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { TokenService } from '../token/token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private tokenService: TokenService
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

  singInRestApi(email: string, passwaord: string): Observable<any> {
    return this.httpClient.post(`${environment.urlAPI}auth`, {
      email,
      passwaord
    }).pipe(
      tap(response => {
        const token = response.token;
        this.tokenService.saveToken(token);
      })
    );
  }
}
