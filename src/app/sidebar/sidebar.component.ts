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

  saveMovie(): void {
    this.movieService.fetchMovieDetails(this.newMovie.title).subscribe(response => {

        console.log('API Response:', response);

        if (response.results && response.results.length) {

            // sort movies based on votes
            const sortedMovies = response.results.sort((a, b) => {
              // Prioritize titles that start with the search phrase
              const startsWithA = a.title.startsWith(this.newMovie.title);
              const startsWithB = b.title.startsWith(this.newMovie.title);
              if (startsWithA && !startsWithB) {
                return -1;
              } else if (!startsWithA && startsWithB) {
                return 1;
              }

              // If neither or both start with the search term, then sort by vote count
              return b.vote_count - a.vote_count;
            });

            const movieData = sortedMovies[0];

            this.newMovie.overview = movieData.overview;
            console.log('Fetched Overview:', movieData.overview);

            const imagePath = movieData.poster_path;
            this.newMovie.coverUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;

            this.newMovie.releaseDate = movieData.release_date.split('-')[0];

            const movieId = movieData.id;

            // Fetch certification
            this.movieService.fetchMovieCertification(movieId).subscribe(certificationResponse => {
                const usRelease = certificationResponse.results.find(r => r.iso_3166_1 === 'US');
                if (usRelease && usRelease.release_dates && usRelease.release_dates.length) {
                    const certification = usRelease.release_dates[0].certification;
                    this.newMovie.rating = certification;
                    console.log('Movie Rating: ' + this.newMovie.rating);
                }


                // Now you can use the movieService's addMovie method to actually add the movie
                this.movieService.addMovie(this.newMovie);

                // After adding, you might want to reset the newMovie object or perform other UI actions
                this.newMovie = {
                    title: '',
                    status: '',
                    platform: '',
                    //... other attributes reset to default
                };
            });
        }
    });
}


  // saveMovie() {
  //   // Fetch details based on the title entered
  //   this.movieService.fetchMovieDetails(this.newMovie.title).subscribe(response => {
  //     if (response.results && response.results.length) {
  //       const movieData = response.results[0];
  //       this.newMovie.releaseDate = movieData.release_date.split('-')[0];
  //       this.newMovie.coverUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
  //       this.movieService.addMovie(this.newMovie);
  //       // Reset the form for the next input
  //       this.newMovie = { title: '', status: '', rating: '', platform: '' };
  //       this.showForm = false; // Optionally hide the form after saving
  //     } else {
  //       // Handle error if movie not found or other issues
  //       console.error('Error fetching movie details from the API');
  //     }
  //   });
  // }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    return Array.from({ length: currentYear - startYear + 1 }).map((_, i) => startYear + i);
  }

}
