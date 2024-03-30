import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() id: string = ""; // wyciągane z url

  constructor(private title: Title, private movies: MoviesService) {}

  ngOnInit() {
    this.title.setTitle("Film " + this.id);
  }
}
