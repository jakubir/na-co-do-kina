import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  public allContentLoaded = false;
  public pageNumber = 1;
  public sort_by = "popularity.desc";
  public genres: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.loadAllMovies().subscribe((response: any) => {
      this.moviesList.push(...response.results);      
    });
  }

  loadAllMovies() { // pobieranie filmów z API
    const min_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() - 42 * 24 * 60 * 60 * 1000)); // 6 tyg. przed
    const max_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)); // dzień po
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl&page=${this.pageNumber}&region=PL&sort_by=${this.sort_by}&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}${this.genres.length > 0 ? '&with_genres=' + this.genres.join('%7C') : ''}`;   
    
    return this.http.get(url, this.options);
  }

  loadNextPage() { // ładowanie kolejnych filmów, gdy użytkownik przewinie stronę do końca
    this.loadAllMovies().subscribe((response: any) => {
      if (!response.results.length)
        this.allContentLoaded = true;
      else
        this.moviesList.push(...response.results);
      this.loadingNewContent = false;
    });
  }

  setFilters(sort_by: string, genres: string[]) { // aplikowanie filtrów i pobieranie filmów z API
    this.loadingNewContent = false;
    this.allContentLoaded = false;
    this.pageNumber = 1;
    this.sort_by = sort_by;
    this.genres = genres;
    this.moviesList = [];

    this.loadAllMovies().subscribe((response: any) => {
      this.moviesList.push(...response.results);
    });;
  }

  resetFilters() { // resetowanie filtrów 
    this.loadingNewContent = false;
    this.allContentLoaded = false;
    this.pageNumber = 1;
    this.sort_by = 'popularity.desc';
    this.genres = [];
    this.moviesList = [];

    this.loadAllMovies().subscribe((response: any) => {
      this.moviesList.push(...response.results);
    });;
  }

  getMovieById(id: number) { // pobieranie informacji o filmie po ID
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pl`;

    return this.http.get(url, this.options);
  }

  getMovieDetailsByTitle(query: string, previousUrl: string) { // wyszukiwanie filmu po tytule
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=pl&page=1`;
    let movieFound = false;

    this.http.get(url, this.options).subscribe((response: any) => {
      response.results.map((result: Movie) => {
        if (
          new Date(result.release_date).getTime() > new Date(new Date().getTime() - 42 * 24 * 60 * 60 * 1000).getTime() && // 6 tyg. przed
          new Date(result.release_date).getTime() < new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime() // dzień po
        ) {
          this.router.navigate([`/movie/${result.id}`])
          movieFound = true;
        }
      })
      if (!movieFound)
        this.router.navigate([previousUrl]);
    });
  }

  getMovieTrailer(id: number) { // pobieranie danych zwiastuna po ID filmu
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=pl`;

    return this.http.get(url, this.options);
  }

  getAllGenres() { // pobieranie listy gatunków filmowych
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=pl`;

    return this.http.get(url, this.options);
  }
}
