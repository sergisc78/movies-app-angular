import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';
import {GoogleAuthProvider} from '@angular/fire/auth'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //DADES QUE S'ENVIARAN DEL FORMULARI
  loginUser: FormGroup;

  // ANGULAR MATERIAL
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  //SPINNER
  loading:boolean=false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private toastr: ToastrService, private router: Router, private firebaseErrors: FirebaseErrorsService) {

    this.loginUser = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    // IF EMAIL AND PASSWORD ARE BLANK
    if (email == "" || password == "") {
      this.toastr.error("Email and password are required !", "Error");
      return;
    }

     //SPINNER
     this.loading = true;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log(user)
      this.loading=false;
      //IF EMAIL IS VERIFY, ENTER INTO APP, ELSE REDIRECT TO VERIFY-EMAIL
      if (user.user?.emailVerified) {
        this.toastr.success("User logged in successfully", "Welcome");
        setTimeout(() => {
          this.router.navigate(['/movies']);
        }, 3000)
      }else{
        this.router.navigate(['/verify-email']);
      }
      //ERRORS
    }).catch((error) => {
      this.loading=false;
      this.toastr.error(this.firebaseErrors.firebaseErrors(error.code), 'Error');

    })

  }

  //LOGIN WITH GOOGLE
  loginGoogle(){
     this.afAuth.signInWithPopup(new GoogleAuthProvider).then(()=>{
      this.toastr.success("User logged in successfully", "Welcome");
      setTimeout(() => {
        this.router.navigate(['/movies']);
      }, 3000)
     }).catch((error)=>{
      this.toastr.error(this.firebaseErrors.firebaseErrors(error.code), 'Error');
     })

     }
  

}
