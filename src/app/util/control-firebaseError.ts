import { FirebaseError } from '../models/firebase-error.model';

export class ControlFirebaseError {
  firebaseErros: FirebaseError[];

  constructor(){
    this.buildObjectfirebaseError();
  }

  private buildObjectfirebaseError(): void{
    this.firebaseErros = [
      {
        Code: 'auth/invalid-email',
        message: 'La dirección de correo electrónico no es válida'
      },
      {
        Code: 'auth/weak-password',
        message: 'La contraseña no puede tener menos de 6 caracteres',
      },
      {
        Code: 'auth/email-already-in-use',
        message: 'La dirección de correo electrónico ya está en uso por otra cuenta',
      }
    ];
  }

  public getErrorMessage(errorCode: string): string{
    if (this.firebaseErros.some(e => e.Code === errorCode)) {
      return this.firebaseErros.find(e => e.Code === errorCode).message;
    }else {
      return `Error desconocido, codigo del error: ${errorCode}`;
    }
  }
}
