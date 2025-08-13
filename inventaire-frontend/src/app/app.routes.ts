import { Routes } from '@angular/router';
import { ListeProduits } from './composants/liste-produits/liste-produits';

export const routes: Routes = [
  { path: '', redirectTo: 'produits', pathMatch: 'full' }, 
  { path: 'produits', component: ListeProduits },
];