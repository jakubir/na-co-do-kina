import { DatePipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() title = "";
  @Input() image = "";
  @Input() description = "";
  @Input() releaseDate = "";
  @Input() movieId = "0";
  @Input() rating = "0";
  percentageRating = 0;

  @Output() showDetails = new EventEmitter<string>();

  ngOnInit() {
    this.percentageRating = Math.round(Number(this.rating) * 10);
  }

  truncate(str: string) { // skróć opis do 15 słów
    const words = str.split(" ");

    return words.length > 15 ? words.splice(0, 15).join(" ") + "..." : words.join(" ");
  }
}
