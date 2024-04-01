import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe],
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

  @Output() showDetails = new EventEmitter<string>();

  truncate(str: string) {
    const words = str.split(" ");

    return words.length > 15 ? words.splice(0, 15).join(" ") + "..." : words.join(" ");
  }
}
