import { Component, Directive, OnInit, ChangeDetectorRef } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private cdRef: ChangeDetectorRef) {
  }

  sortDirections: { [key: string]: 'asc' | 'desc' } = {
    status: 'asc',
    releaseDate: 'asc',
    rating: 'asc',
    platform: 'asc',
  }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.cdRef.detectChanges();
  }

  sortByTitle(direction: 'asc' | 'desc'): void {
    this.movies.sort((a, b) => {
      return direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
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
      case 'title':
        this.sortByTitle(direction);
        break;
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
