import { Component,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../movies.service';
import { NgForm, FormsModule } from '@angular/forms';

interface Genres {
  "id": number,
  "name": string
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  sortOptions = [
    ['popularity.desc', 'Po popularności malejąco'],
    ['popularity.asc', 'Po popularności rosnąco'],
    ['vote_average.desc', 'Po ocenie malejąco'],
    ['vote_average.asc', 'Po ocenie rosnąco'],
    ['title.asc', 'Po tytule (A-Z)'],
    ['title.desc', 'Po tytule (Z-A)'],
  ]
  genres: Genres[] = [];
  @ViewChild('select') select!: ElementRef;
  sortOptionSelected = 'popularity.desc'

  constructor(public movies: MoviesService) {}

  ngOnInit() {
    this.movies.getAllGenres().subscribe((response: any) => {
      this.genres = response.genres;
    });
  }

  filter(form: NgForm) {
    let sort_by = form.value.sort || "popularity.desc";
    let genres = [];
    
    for (let genre in form.value) {
      if (genre !== 'sort' && form.value[genre] == true)
        genres.push(genre.slice(1));
    }

    this.movies.setFilters(sort_by, genres);
  }
}
