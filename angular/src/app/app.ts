import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App { }