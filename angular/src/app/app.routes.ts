import { Routes } from '@angular/router';
import { ListeProduits } from './composants/liste-produits/liste-produits';
import { ProductList } from './product-list/product-list';
import { Menu } from './components/menu/menu';
import { NodeCommandes } from './components/node-commandes/node-commandes';
import { MesBdd } from './components/mes-bdd/mes-bdd';
import { MesBddStructure } from './components/mes-bdd-structure/mes-bdd-structure';
import { MesBddUtilisateurs } from './components/mes-bdd-utilisateurs/mes-bdd-utilisateurs';
import { MesBddDonnees } from './components/mes-bdd-donnees/mes-bdd-donnees';

export const routes: Routes = [
  { path: '', redirectTo: 'produits', pathMatch: 'full' }, 
  { path: 'produits', component: ListeProduits },
  { path: 'product-list', component: ProductList },
  { path: 'menu', component: Menu },
  { path: 'node-commandes', component: NodeCommandes },
  {
    path: 'mes-bdd',
    component: MesBdd,
    children: [
      { path: 'structure', component: MesBddStructure },
      { path: 'utilisateurs', component: MesBddUtilisateurs },
      { path: 'données', component: MesBddDonnees },
      { path: '', redirectTo: 'structure', pathMatch: 'full' }
    ]
  }
];