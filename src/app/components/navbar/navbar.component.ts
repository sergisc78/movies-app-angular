import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { LoginLogoutService } from 'src/app/services/login-logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth,private loginlogout:LoginLogoutService) { }

  //const isLogged=this.afAuth.



  ngOnInit(): void {
  }

 

 

}
