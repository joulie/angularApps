import { Routes } from '@angular/router';
import { Assignments } from './components/assignments/assignments';
import { ProductList } from './components/product-list/product-list';
import { Menu } from './components/navigation/menu/menu';
import { NodeCommandes } from './components/node-commandes/node-commandes';
import { MesBdd } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd';
import { MesBddStructure } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-structure/mes-bdd-structure';
import { MesBddUtilisateurs } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-utilisateurs/mes-bdd-utilisateurs';
import { MesBddDonnees } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-donnees/mes-bdd-donnees';

export const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' }, 
  { path: 'assignments', component: Assignments },
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