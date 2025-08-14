import { Component } from '@angular/core';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [Menu],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation { }
