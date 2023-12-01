import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  //DADES QUE S'ENVIARAN DEL FORMULARI
  forgotPassword: FormGroup;

  // ANGULAR MATERIAL
  hide = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private toastr: ToastrService, private router: Router, private firebaseErrors: FirebaseErrorsService) {


    this.forgotPassword = this.fb.group({
      email: ['', Validators.required]
    })
  }



  ngOnInit(): void {
  }

  // RESET PASSWORD WITH EMAIL
  forgotPass() {
    const email = this.forgotPassword.value.email;

    // IF EMAIL IS EMPTY
    if (email == "") {
      this.toastr.error("Email is required", "Error");
      return;
    }

    this.afAuth.sendPasswordResetEmail(email).then(() => {
      //SUCCESS
      this.toastr.info('We send you an email to reset password', 'Reset Password');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 6000);
      //ERRORS
    }).catch((error) => {
      console.log(error);
      this.toastr.error(this.firebaseErrors.firebaseErrors(error.code), 'Error');

    })
  }

}
