import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ArrayResponse } from '../interfaces/arrayResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /* URL I API KEY DE L'API */
  private URL_BASE: string = 'https://api.themoviedb.org/3/search/movie'
  private API_KEY: string = '80f9160b0356b4846597ebda80c0cc38'


  constructor(private http: HttpClient) { }


  // MOSTRA TOTES LES PEL-LÍCULES
  getMovies(searchMovie: string): Observable<Movie[]> {
    return this.http.get<ArrayResponse>(`${this.URL_BASE}?query=${searchMovie}&api_key=${this.API_KEY}`)
      .pipe(
        map(response => {
          return response.results
        })
      );
  }
}
