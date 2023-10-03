import { Component, Directive, OnInit } from '@angular/core';
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
    {
      title: 'Movie C',
      releaseDate: '2015-12-01',
      status: 'Unwatched',
      rating: 'G',
      platform: 'Disney+',
    },
    {
      title: 'Movie D',
      releaseDate: '2021-12-01',
      status: 'Unwatched',
      rating: 'MA',
      platform: 'Prime',
    },
  ];

  sortDirections: { [key: string]: 'asc' | 'desc' } = {
    status: 'asc',
    releaseDate: 'asc',
    rating: 'asc',
    platform: 'asc',
  }

  ngOnInit(): void {

  }

  sortByStatus(direction: 'asc' | 'desc'): void {
    this.movies.sort((a, b) => {
      return direction === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    });
  }

  sortByReleaseDate(direction: 'asc' | 'desc'): void {
    this.movies.sort((a, b) => {
      return direction ==='asc' ? a.releaseDate.localeCompare(b.releaseDate) : b.status.localeCompare(a.status);
    });
  }

  sortByRating(direction: 'asc' |'desc'): void {
    const ratingOrder = { 'G' : 1, 'PG' : 2, 'PG-13' : 3, 'R' : 4, 'MA' : 5};

    this.movies.sort((a, b) => {
      const orderA = ratingOrder[a.rating];
      const orderB = ratingOrder[b.rating];

      const result = orderA - orderB;

      return direction === 'asc' ? result : -result;
    });
  }

  sortByPlatform(direction: 'asc' | 'desc'): void {
    this.movies.sort((a, b) => {
      return direction === 'asc' ? a.platform.localeCompare(b.platform) : b.platform.localeCompare(a.platform);
    });
  }

  handleSort(attribute: string): void {
    const direction = this.sortDirections[attribute];
    switch(attribute) {
      case 'status':
        this.sortByStatus(direction);
        break;
      case 'releaseDate':
        this.sortByReleaseDate(direction);
        break;
      case 'rating':
        this.sortByRating(direction);
        break;
      case 'platform':
        this.sortByPlatform(direction);
        break;
    }

    this.sortDirections[attribute] = direction === 'asc' ? 'desc' : 'asc';
  }
}
