// filters.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
    titleFilter: string = '';
    statusFilter: string = '';
    releaseDateFilter: string = '';
    ratingFilter: string = '';
    platformFilter: string = '';

    @Output() filtersChanged = new EventEmitter<any>();

    onFilterChange() {
        this.filtersChanged.emit({
            title: this.titleFilter,
            status: this.statusFilter,
            releaseDate: this.releaseDateFilter,
            rating: this.ratingFilter,
            platform: this.platformFilter
        });
    }
}
