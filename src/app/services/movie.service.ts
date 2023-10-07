import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = JSON.parse(localStorage.getItem('movies')) || [];
  private TMDB_API_KEY = '10563f38f0972f5a2479cbd15fafcbfa';

  private moviesSubject = new BehaviorSubject<Movie[]>(this.movies);
  movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getMovies(): Movie[] {
    return [...this.movies];
  }

  addMovie(movie: Movie): void {

    // Find the current highest id
    const maxId = this.movies.reduce((max, currentMovie) => {
      return currentMovie.id > max ? currentMovie.id : max;
    }, 0);

    movie.id = maxId + 1;

    //Add the movie to the array
    this.movies.push(movie);

    //Add the movie to local storage
    localStorage.setItem('movies', JSON.stringify(this.movies));

    // Emit the updated movie array
    this.moviesSubject.next(this.movies);
  }

  deleteMovie(id: number): void {
    // Ask hte user for confirmation
    const isConfirmed = confirm('Are you sure you want to delete this movie?');

    if (isConfirmed) {
      // Filter out the movie with the specified ID, effectively deleting it from the movies array.
      this.movies = this.movies.filter(movie => movie.id !== id);

      // Update the local storage with the new movies array after the deletion.
      localStorage.setItem('movies', JSON.stringify(this.movies));

      // Emit the updated movie array
      this.moviesSubject.next(this.movies);
    }
  }

  updateMovie(updatedMovie: Movie): void {
    // Find the index of the movie with the given ID in the movies array.
    const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);

    // If the movie is found, update its details.
    if (index !== -1) {
      this.movies[index] = updatedMovie;

      // Update the local storage to reflect the changes.
      localStorage.setItem('movies', JSON.stringify(this.movies));

      // Emit the updated movie array
      this.moviesSubject.next(this.movies);
    }
  }

  // Remove after I verify fetchMovieDetails is working properly.
  // fetchMovieCover(title: string): Observable<any> {
  //   const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
  //   return this.http.get(searchUrl);
  // }

  fetchMovieDetails(title: string): Observable<any> {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
    return this.http.get(searchUrl);
  }

  fetchMovieCertification(movieId: number): Observable<any> {
    const certificationUrl = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${this.TMDB_API_KEY}`;
    return this.http.get(certificationUrl);
  }
}
