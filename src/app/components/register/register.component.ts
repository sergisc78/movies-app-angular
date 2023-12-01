import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // ANGULAR MATERIAL
  hide = true;

  //DADES QUE S'ENVIARAN DEL FORMULARI
  registerUser: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  //SPINNER
  loading: boolean = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private toastr: ToastrService, private router: Router, private firebaseErrorsService: FirebaseErrorsService) {

    this.registerUser = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confirmPassword = this.registerUser.value.confirmPassword;

    // IF PASSWORDS DON'T MATCH
    if (password != confirmPassword) {
      this.toastr.error('Passwords do not match !', 'Error');
      return;
    }

    // IF EMAIL AND PASSWORDS ARE BLANK
    if (email == "" || password == "" || confirmPassword == "") {
      this.toastr.error("Email and passwords are required !", "Error");
      return;
    }


    //IF PASSWORDS ARE TOO SHORT
    if (password.length < 6 && confirmPassword.length < 6) {
      this.toastr.error('Password should be at least 6 characters !', 'Error');
      return;
    }


    //SPINNER
    this.loading = true;


    // FIREBASE REGISTER
    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
      this.loading=false;
      //IF EMAIL IS VERIFY, GET IN, ELSE REDIRECT TO VERIFY-EMAIL
      if (user.user?.emailVerified) {
        this.toastr.success("Successful login", "Welcome");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000)
      } else {
        this.verifyEmail();
      }
      //ERRORS
    }).catch((error) => {
      this.loading=false;
      this.toastr.error(this.firebaseErrorsService.firebaseErrors(error.code), 'Error');
    })

  }
  //FUNCIÓ PER VERIFICAR L'EMAIL
  verifyEmail() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification()).then(() => {
      this.toastr.info("User registered sucessfully but we would like to verify your email now", "Welcome");
      setTimeout(() => {
        this.router.navigate(['/verify-email']);
      }, 6000)
    })

  }

}
