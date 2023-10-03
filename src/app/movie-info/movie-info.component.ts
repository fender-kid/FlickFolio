import { Component } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent {
  movies: Movie[] = [
    {
      title: 'Movie A',
      releaseDate: '2023-01-01',
      status: 'Watched',
      rating: 'PG-13',
      platform: 'Netflix',
    },
    {
      title: 'Movie B',
      releaseDate: '2023-12-01',
      status: 'Unwatched',
      rating: 'R',
      platform: 'Hulu',
    },
  ];

  sortMoviesByStatus(): void {
    this.movies.sort((a, b) => a.status.localeCompare(b.status));
  }
}

