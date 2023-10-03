import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie.model'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Input() movies: Movie[];
  @Output() onSort = new EventEmitter<string>();

  sort(attribute: string): void {
    this.onSort.emit(attribute);
  }
}
