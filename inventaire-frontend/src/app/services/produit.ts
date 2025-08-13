import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Produit {
  private apiUrl = 'http://localhost:3000/produits';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ajouterProduit(produit: any): Observable<any> {
    return this.http.post(this.apiUrl, produit);
  }

  supprimerProduit(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  modifierProduit(id: number, produit: any) {
    return this.http.put(`${this.apiUrl}/${id}`, produit);
  }
}