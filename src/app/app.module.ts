import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//MODULES
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


// ANGULAR MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';




//COMPONENTS
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { AppComponent } from './app.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    CardMovieComponent,
    SearchMovieComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    HomeComponent,
    ForgotPasswordComponent,
    SpinnerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
