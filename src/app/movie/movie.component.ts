import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';

interface MovieDetails {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: string,
  budget: number,
  genres: [
    {
      id: number,
      name: string
    }
  ],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: [
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }
  ],
  production_countries: [
    {
      iso_3166_1: string,
      name: string
    }
  ],
  release_date: number,
  revenue: number,
  runtime: number,
  spoken_languages: [
    {
      english_name: string,
      iso_639_1: string,
      name: string
    }
  ],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() id: string = ""; // wyciągane z url
  movieDetails: MovieDetails | undefined;

  constructor(private title: Title, private movies: MoviesService) {}

  ngOnInit() {
    this.movies.getMovieById(Number(this.id)).subscribe((response: any) => {
      this.movieDetails = response;
      this.title.setTitle(this.movieDetails!.title + ' — Na co do kina?');
    })
  }
}
