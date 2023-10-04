import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor() { }

  getMovies(): Movie[] {
    return [...this.movies];
  }

  addMovie(movie: Movie): void {
    this.movies.push(movie);
    this.moviesSubject.next(this.movies); // Emit the updated movie array.
  }
}
