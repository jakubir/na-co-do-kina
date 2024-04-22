import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../movies.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private movies: MoviesService, private router: Router) {}

  search(form: NgForm) {
    this.router.navigate(['/']); // obejście problemu z brakiem rerenderowania komponentu
    this.movies.searchForMovie(form.value.query, this.router.url);
  }

}
