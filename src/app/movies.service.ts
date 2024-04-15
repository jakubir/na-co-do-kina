import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(private http: HttpClient) { }

  getAll(page: number) {
    const min_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() - 35 * 24 * 60 * 60 * 1000)); // 5 tyg. przed
    const max_date = Intl.DateTimeFormat().format(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)); // tydz. po
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pl&page=${page}&region=PL&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`;

    return this.http.get(url, this.options);
  }

  getMovieById(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pl`;

    return this.http.get(url, this.options);
  }
}
