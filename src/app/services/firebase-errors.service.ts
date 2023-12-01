import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorsService {

  constructor() { }

  //FIREBASE ERRORS
  firebaseErrors(code: string) {

    switch (code) {
      //User exist
      case 'auth/email-already-in-use':
        return 'User already exists !';
      //Email wrong 
      case 'auth/invalid-email':
        return 'The email format is not valid !';
      // User don´t exist
      case 'auth/invalid-login-credentials':
        return 'User does not exist !';
      //Unknown error
      default:
        return 'Unknown error'

    }
  }
}
