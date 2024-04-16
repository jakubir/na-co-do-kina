import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../movies.service';

interface Genres {
  "id": number,
  "name": string
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  constructor(private movies: MoviesService) {}

  sortOptions = [
    ['popularity.desc', 'Po popularności malejąco'],
    ['popularity.asc', 'Po popularności rosnąco'],
    ['vote_average.desc', 'Po ocenie malejąco'],
    ['vote_average.asc', 'Po ocenie rosnąco'],
    ['title.asc', 'Po tytule (A-Z)'],
    ['title.desc', 'Po tytule (Z-A)'],
  ]

  genres: Genres[] = [];

  ngOnInit() {
    this.movies.getAllGenres().subscribe((response: any) => {
      this.genres = response.genres;
    });
  }
}
