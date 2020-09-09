import { FirebaseError } from '../models/firebase-error.model';

export class ControlFirebaseError {
  firebaseErros: FirebaseError[];

  constructor(){
    this.buildObjectfirebaseError();
  }

  private buildObjectfirebaseError(): void{
    this.firebaseErros = [
      {
        code: 'auth/invalid-email',
        message: 'La dirección de correo electrónico no es válida'
      },
      {
        code: 'auth/weak-password',
        message: 'La contraseña no puede tener menos de 6 caracteres',
      },
      {
        code: 'auth/email-already-in-use',
        message: 'La dirección de correo electrónico ya está en uso por otra cuenta',
      },
      {
        code: 'auth/user-not-found',
        message: 'El correo electrónico no corresponde a ninguna cuenta previamente registrada'
      },
      {
        code: 'auth/wrong-password',
        message: 'La contraseña es incorrecta'
      }
    ];
  }

  public getErrorMessage(errorCode: string): string{
    if (this.firebaseErros.some(e => e.code === errorCode)) {
      return this.firebaseErros.find(e => e.code === errorCode).message;
    }else {
      return `Error desconocido, codigo del error: ${errorCode}`;
    }
  }
}
