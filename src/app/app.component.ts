import { Component } from '@angular/core';
import { BoardComponent } from "./content/board/board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-drag-and-drop';
}
