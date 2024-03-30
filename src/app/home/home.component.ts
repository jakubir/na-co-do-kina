import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageNumber = 1;

  constructor(private movies: MoviesService) {}
  
  ngOnInit() {
    this.movies.getAll(this.pageNumber).subscribe((movies: any) => {
      console.log(movies.results);
    });
  }
}
