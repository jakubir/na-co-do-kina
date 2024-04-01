import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';

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
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageNumber = 1;
  moviesList: Movie[] = [];

  constructor(private movies: MoviesService) {}
  
  ngOnInit() {
    this.movies.getAll(this.pageNumber).subscribe((response: any) => {
      this.moviesList = response.results;
    });
  }

  showMovieDetails(id: string) {
    console.log(id)
  }
}
