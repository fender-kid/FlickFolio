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

}
