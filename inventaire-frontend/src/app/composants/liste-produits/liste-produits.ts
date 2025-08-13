import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit';
import { NgFor, NgClass, NgIf } from '@angular/common'; // <-- Ajoute NgIf
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
  imports: [NgFor, NgClass, NgIf, FormsModule] // <-- Ajoute NgIf ici
})
export class ListeProduits implements OnInit {
  produits: any[] = [];

  constructor(private produitService: Produit) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  afficherForm = false;
  nom = '';
  quantite: number | null = null;

  ajouterProduit() {
    if (this.nom && this.quantite !== null) {
      this.produitService.ajouterProduit(this.nom, this.quantite).subscribe({
        next: () => {
          this.produitService.getProduits().subscribe(data => {
            this.produits = data;
          });
          this.nom = '';
          this.quantite = null;
          this.afficherForm = false;
        }
      });
    }
  }
}