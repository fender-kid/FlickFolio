import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() selectedMovie: Movie | null = null;
  showForm: boolean = false;
  newMovie: Movie = {
    title: '',
    releaseDate: '',
    status: '',
    rating: '',
    platform: '',
  };

  constructor(private movieService: MovieService) {
  }

  // Delete after saveMovie() method confirmed working
  addMovie() {
    this.movieService.addMovie(this.newMovie);
    this.newMovie = {
      title: '',
      releaseDate: '',
      status: '',
      rating: '',
      platform: '',
    };
    this.showForm = false;
  }

  saveMovie() {
    // Fetch details based on the title entered
    this.movieService.fetchMovieDetails(this.newMovie.title).subscribe(response => {
      if (response.results && response.results.length) {
        const movieData = response.results[0];
        this.newMovie.releaseDate = movieData.release_date.split('-')[0];
        this.newMovie.coverUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
        this.movieService.addMovie(this.newMovie);
        // Reset the form for the next input
        this.newMovie = { title: '', status: '', rating: '', platform: '' };
        this.showForm = false; // Optionally hide the form after saving
      } else {
        // Handle error if movie not found or other issues
        console.error('Error fetching movie details from the API');
      }
    });
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    return Array.from({ length: currentYear - startYear + 1 }).map((_, i) => startYear + i);
  }

}
