import { Component, Directive, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movies: Movie[] = [];
  private moviesSubscription: Subscription;
  filteredMovies: Movie[] =[];

  constructor(private movieService: MovieService) {
  }

  sortDirections: { [key: string]: 'asc' | 'desc' } = {
    status: 'asc',
    releaseDate: 'asc',
    rating: 'asc',
    platform: 'asc',
  }

  ngOnInit(): void {
    this.moviesSubscription = this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      // initialize filtered movies
      this.filteredMovies = [...this.movies];
      console.log('Updated movies in MovieInfoComponent:', this.movies);
    });
  }

  ngOnDestroy(): void {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
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
      return direction ==='asc' ? a.releaseDate.localeCompare(b.releaseDate) : b.releaseDate.localeCompare(a.releaseDate);
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

  // Track the movie being edited
  editingMovie: Movie | null = null;

  startEditing(movie: Movie): void {
    // Creates a shallow copy to prevent direct modifications to the original object.
    this.editingMovie = { ...movie };
  }

  // Save the edited movie details.
  saveEditedMovie(): void {
    if (this.editingMovie) {
      this.movieService.updateMovie(this.editingMovie);

      // Reset the editing state
      this.editingMovie = null;
    }
  }

  deleteMovie(id: number): void {
    this.movieService.deleteMovie(id);
  }

  applyFilters(filters: any) {
    this.filteredMovies = this.movies.filter(movie => {
      return (!filters.title || movie.title.includes(filters.title))
      && (!filters.status || movie.status.includes(filters.status))
      && (!filters.releaseDate || movie.releaseDate.includes(filters.releaseDate))
      && (!filters.rating || movie.rating.includes(filters.rating))
      && (!filters.platform || movie.platform.includes(filters.platform));
    });
  }

}
