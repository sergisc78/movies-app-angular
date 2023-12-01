import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  movies: Movie[] = [];
  datauser: any;

  constructor(
    private movieService: MovieService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // SI L'USUARI ÉS NULL O NO ESTÀ VERIFICAT, NO SE'L POT DEIXAR ENTRAR
    this.afAuth.currentUser.then((user) => {
      if (user && user.emailVerified) {
        this.datauser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  // MOSTRA TOTES LES PEL-LÍCULES QUE ES CARREGUEN AL SERVICE
  getMovies(searchMovie: string) {
    this.movieService.getMovies(searchMovie).subscribe((movies) => {
      //console.log(data);
      this.movies = movies;
    });
  }
  // LOGOUT
  logout() {
    this.afAuth.signOut().then(() => {
      setTimeout(() => {
        this.toastr.success('User logout successfully', 'Logout');
        this.router.navigate(['/']);
      }, 3000);
    });
  }
}
