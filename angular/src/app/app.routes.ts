import { Routes } from '@angular/router';
import { ListeProduits } from './composants/liste-produits/liste-produits';
import { ProductList } from './product-list/product-list';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  { path: '', redirectTo: 'produits', pathMatch: 'full' }, 
  { path: 'produits', component: ListeProduits },
  { path: 'product-list', component: ProductList },
  { path: 'menu', component: Menu }
];