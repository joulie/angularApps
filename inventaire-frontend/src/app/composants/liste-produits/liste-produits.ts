import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
  imports: [NgFor, NgClass, NgIf, FormsModule]
})
export class ListeProduits implements OnInit {
  produits: any[] = [];
  messageErreur = '';

  afficherForm = false;
  nom = '';
  prenom = '';
  site = '';
  code_projet = '';
  nom_projet = '';
  type_materiel = '';
  detail_materiel = '';
  num_serie = '';

  constructor(private produitService: Produit) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  ajouterProduit() {
  if (!this.nom || this.nom.trim() === '') {
    this.messageErreur = 'Le nom est obligatoire.';
    return;
  }
  this.messageErreur = '';
  const produit = {
    nom: this.nom,
    prenom: this.prenom,
    site: this.site,
    code_projet: this.code_projet,
    nom_projet: this.nom_projet,
    type_materiel: this.type_materiel,
    detail_materiel: this.detail_materiel,
    num_serie: this.num_serie
  };
  this.produitService.ajouterProduit(produit).subscribe({
    next: () => {
      this.produitService.getProduits().subscribe(data => {
        this.produits = data;
      });
      this.nom = '';
      this.prenom = '';
      this.site = '';
      this.code_projet = '';
      this.nom_projet = '';
      this.type_materiel = '';
      this.detail_materiel = '';
      this.num_serie = '';
      this.afficherForm = false;
    }
  });
}

  supprimerProduit(id: number) {
    this.produitService.supprimerProduit(id).subscribe(() => {
      this.produits = this.produits.filter(p => p.id !== id);
    });
  }
}