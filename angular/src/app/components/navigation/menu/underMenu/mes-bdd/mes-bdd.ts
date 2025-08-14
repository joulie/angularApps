import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mes-bdd',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // <-- Ajoute RouterModule ici
  templateUrl: './mes-bdd.html',
  styleUrl: './mes-bdd.css'
})
export class MesBdd { }
