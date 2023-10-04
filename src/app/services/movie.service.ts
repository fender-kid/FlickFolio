import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];

  constructor() { }

  getMovies(): Movie[] {
    return [...this.movies];
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
  }
}
