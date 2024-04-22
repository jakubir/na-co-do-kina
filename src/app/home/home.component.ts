import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { FiltersComponent } from './filters/filters.component';
import { Router } from '@angular/router';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('listEnd') listEnd!: ElementRef;

  constructor(public movies: MoviesService, private router: Router) {}

  showMovieDetails(id: string) { // przejście do strony ze szczegółami filmu
    this.router.navigate([`/movie/${id}`]);
  }
  
  @HostListener('document:scroll', ['$event']) // ładowanie kolejnych filmów po przewinięciu do końca listy
  loadMoreContent() {
    if (!this.movies.allContentLoaded && !this.movies.loadingNewContent && this.listEnd.nativeElement.getBoundingClientRect().top < window.innerHeight) {
      this.movies.loadingNewContent = true;
      this.movies.pageNumber++;
      this.movies.loadNextPage();
    }
  }
}
