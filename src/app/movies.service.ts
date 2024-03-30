import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface NowPlaying {
  dates: {}, 
  page: number, 
  results: [], 
  total_pages: number, 
  total_results: number
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getAll(page = 1) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=pl&page=${page}`;
    const result = this.http.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGNjOWQ5NjQwZDhlYTdhZGVmODVmMjI0YzRkODlkNSIsInN1YiI6IjY1ZjgxMjhkMjQyZjk0MDE2NGNjZGU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvjDDYLz4QSPBzjevT6vFZgYbTgkvbifK24QgQ6A5_g'
      },
    });

    return result;
  }
}
