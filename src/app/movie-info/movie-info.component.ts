import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
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

  ngOnInit(): void {

  }

  sortByStatus(): void {
    this.movies.sort((a, b) => a.status.localeCompare(b.status));
  }

  sortByReleaseDate(): void {
    this.movies.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  }

  sortByRating(): void {
    const ratingOrder = { 'G': 1, 'PG' : 2, 'PG13' : 3, 'R' : 4, 'MA' : 5};

    this.movies.sort((a, b) => {
      return ratingOrder[a.rating] - ratingOrder[b.rating];
    });
  }

  sortByPlatform(): void {
    this.movies.sort((a, b) => a.platform.localeCompare(b.platform));
  }
}

// Add my additional methods.
