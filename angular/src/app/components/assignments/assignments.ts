import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  imports: [NgFor, NgIf, FormsModule], 
  standalone: true
})
export class Assignments implements OnInit {
  assignments: any[] = [];
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

  produitEnEdition: any = null;
  ligneEnEdition: number | null = null;
  copieProduit: any = {};

  constructor(private assignmentservice: Produit) {}

  ngOnInit(): void {
    this.assignmentservice.getAssignments().subscribe(data => {
      this.assignments = data;
    });
  }

  editerProduit(produit: any) {
    this.produitEnEdition = { ...produit };
    this.afficherForm = true;
    this.nom = produit.nom;
    this.prenom = produit.prenom;
    this.site = produit.site;
    this.code_projet = produit.code_projet;
    this.nom_projet = produit.nom_projet;
    this.type_materiel = produit.type_materiel;
    this.detail_materiel = produit.detail_materiel;
    this.num_serie = produit.num_serie;
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

    if (this.produitEnEdition && this.produitEnEdition.id) {
      // Modification
      this.assignmentservice.modifierProduit(this.produitEnEdition.id, produit).subscribe({
        next: () => {
          this.assignmentservice.getAssignments().subscribe(data => {
            this.assignments = data;
          });
          this.annulerEdition();
        }
      });
    } else {
      // Ajout
      this.assignmentservice.ajouterProduit(produit).subscribe({
        next: () => {
          this.assignmentservice.getAssignments().subscribe(data => {
            this.assignments = data;
          });
          this.annulerEdition();
        }
      });
    }
  }

  validerEdition(produit: any) {
    // Optionnel : vérifie que le nom n'est pas vide
    if (!produit.nom || produit.nom.trim() === '') {
      this.messageErreur = 'Le nom est obligatoire.';
      return;
    }
    this.messageErreur = '';
    this.assignmentservice.modifierProduit(produit.id, produit).subscribe({
      next: () => {
        this.assignmentservice.getAssignments().subscribe(data => {
          this.assignments = data;
        });
        this.ligneEnEdition = null;
      }
    });
  }

  annulerEdition() {
    this.nom = '';
    this.prenom = '';
    this.site = '';
    this.code_projet = '';
    this.nom_projet = '';
    this.type_materiel = '';
    this.detail_materiel = '';
    this.num_serie = '';
    this.afficherForm = false;
    this.produitEnEdition = null;
    this.ligneEnEdition = null;
    this.messageErreur = '';
    // Optionnel : recharger la liste pour annuler les modifs locales
    this.assignmentservice.getAssignments().subscribe(data => {
      this.assignments = data;
    });
  }

  supprimerProduit(id: number) {
    this.assignmentservice.supprimerProduit(id).subscribe(() => {
      this.assignments = this.assignments.filter(p => p.id !== id);
    });
  }
}