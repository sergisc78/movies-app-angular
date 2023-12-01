import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

  constructor(private afAuth: AngularFireAuth) { }

  token:string | undefined;

  isLogged(){
    return this.token;
  }

  logout(){
    this.afAuth.signOut();
  }
}
