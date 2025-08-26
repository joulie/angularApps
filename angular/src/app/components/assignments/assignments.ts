import { Component, OnInit } from '@angular/core';
import { Produit } from '../../services/produit';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  selectedProductName: string = '';
  selectedCode: string = '';
  searchText: string = '';

  afficherForm = false;
  nom = '';
  prenom = '';
  site = '';
  code_projet = '';
  nom_projet = '';
  type_materiel = '';
  detail_materiel = '';
  num_serie = '';

  assignementEnEdition: any = null;
  ligneEnEdition: number | null = null;
  copieAssignement: any = {};
  products: any[] | undefined;

  constructor(private assignmentservice: Produit,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.assignmentservice.getAssignments().subscribe(data => {
      this.assignments = data;
    });
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
      console.log('products:', this.products);
    });
  }

  editerAssignement(assignement: any) {
    this.assignementEnEdition = { ...assignement };
    this.afficherForm = true;
    this.nom = assignement.nom;
    this.prenom = assignement.prenom;
    this.site = assignement.site;
    this.code_projet = assignement.code_projet;
    this.nom_projet = assignement.nom_projet;
    this.type_materiel = assignement.type_materiel;
    this.detail_materiel = assignement.detail_materiel;
    this.num_serie = assignement.num_serie;
  }

  ajouterAssignement() {
    if (!this.nom || this.nom.trim() === '') {
      this.messageErreur = 'Le nom est obligatoire.';
      return;
    }
    this.messageErreur = '';
    const assignement = {
      nom: this.nom,
      prenom: this.prenom,
      site: this.site,
      code_projet: this.code_projet,
      nom_projet: this.nom_projet,
      type_materiel: this.selectedProductName,
      detail_materiel: this.selectedCode,
      num_serie: this.num_serie
    };

    if (this.assignementEnEdition && this.assignementEnEdition.id) {
      // Modification
      this.assignmentservice.modifierProduit(this.assignementEnEdition.id, assignement).subscribe({
        next: () => {
          this.assignmentservice.getAssignments().subscribe(data => {
            this.assignments = data;
          });
          this.annulerEdition();
        }
      });
    } else {
      // Ajout
      this.assignmentservice.ajouterProduit(assignement).subscribe({
        next: () => {
          this.assignmentservice.getAssignments().subscribe(data => {
            this.assignments = data;
          });
          this.annulerEdition();
        }
      });
    }
  }

  validerEdition(assignement: any) {
    if (!assignement.nom || assignement.nom.trim() === '') {
      this.messageErreur = 'Le nom est obligatoire.';
      return;
    }
    this.messageErreur = '';
    this.assignmentservice.modifierProduit(assignement.id, assignement).subscribe({
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
    this.assignementEnEdition = null;
    this.ligneEnEdition = null;
    this.messageErreur = '';
    this.assignmentservice.getAssignments().subscribe(data => {
      this.assignments = data;
    });
  }

  supprimerAssignement(id: number) {
    this.assignmentservice.supprimerProduit(id).subscribe(() => {
      this.assignments = this.assignments.filter(a => a.id !== id);
    });
  }

  get codesForSelectedProduct(): string[] {
    if (!this.products || !this.selectedProductName) return [];
    return this.products
      .filter(p => p.productName.trim() === this.selectedProductName.trim())
      .map(p => p.code);
  }

  get uniqueProductNames(): string[] {
    if (!this.products) return [];
    return Array.from(new Set(this.products.map(p => p.productName.trim())));
  }

  get filteredAssignments(): any[] {
    if (!this.searchText) return this.assignments;
    const search = this.searchText.toLowerCase();
    return this.assignments.filter(assignement =>
      Object.values(assignement).some(val =>
        val && val.toString().toLowerCase().includes(search)
      )
    );
  }
}