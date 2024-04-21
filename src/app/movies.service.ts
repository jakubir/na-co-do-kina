import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGNjOWQ5NjQwZDhlYTdhZGVmODVmMjI0YzRkODlkNSIsInN1YiI6IjY1ZjgxMjhkMjQyZjk0MDE2NGNjZGU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvjDDYLz4QSPBzjevT6vFZgYbTgkvbifK24QgQ6A5_g'
    },
  }
  public loadingNewContent = false;
  public moviesList: Movie[] = [];
  public allContentLoaded: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllMovies(1).subscribe((response: any) => {
      this.moviesList.push(...response.results);
    });;
  }

  getAllMovies(page: number) {
    const min_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() - 42 * 24 * 60 * 60 * 1000)); // 6 tyg. przed
    const max_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)); // tydz. po
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl&page=${page}&region=PL&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`;
    
    return this.http.get(url, this.options);
  }

  loadNextPage(page: number) {
    this.getAllMovies(page).subscribe((response: any) => {
      if (!response.results.length)
        this.allContentLoaded = true;
      else
        this.moviesList.push(...response.results);
      this.loadingNewContent = false;
    });;
  }

  getMovieById(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pl`;

    return this.http.get(url, this.options);
  }

  getAllGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=pl`;

    return this.http.get(url, this.options);
  }
}
