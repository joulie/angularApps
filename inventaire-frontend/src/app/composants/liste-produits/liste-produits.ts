import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit';
import { NgFor, NgClass } from '@angular/common'; // <-- Ajoute NgClass

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.html',
  styleUrl: './liste-produits.css',
  imports: [NgFor, NgClass] // <-- Ajoute NgClass ici
})
export class ListeProduits implements OnInit {
  produits: any[] = [];

  constructor(private produitService: Produit) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }
}