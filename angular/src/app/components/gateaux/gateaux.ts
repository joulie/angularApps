
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
	selector: 'app-gateaux',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './gateaux.html',
	styleUrls: ['./gateaux.css']
})
export class Gateaux {
		patisseries = [
			{ nom: 'Éclair au chocolat', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Tarte aux fraises', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Paris-Brest', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Opéra', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Mille-feuille', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Religieuse', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Saint-Honoré', image: 'assets/images/leaf_rake.png' },
			{ nom: 'Tarte citron', image: 'assets/images/leaf_rake.png' }
		];

	selectionner(nom: string) {
		alert('Vous avez sélectionné : ' + nom);
	}
}
