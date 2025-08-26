import { Routes } from '@angular/router';
import { Assignments } from './components/assignments/assignments';
import { ProductList } from './components/product-list/product-list';
import { Menu } from './components/navigation/menu/menu';
import { NodeCommandes } from './components/node-commandes/node-commandes';
import { MesBdd } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd';
import { MesBddStructure } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-structure/mes-bdd-structure';
import { MesBddUtilisateurs } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-utilisateurs/mes-bdd-utilisateurs';
import { MesBddDonnees } from './components/navigation/menu/underMenu/mes-bdd/mes-bdd-donnees/mes-bdd-donnees';
import { LoginComponent } from './components/login/login.component';
import { Gateaux } from './components/gateaux/gateaux';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: Assignments, canActivate: [authGuard] },
  { path: 'product-list', component: ProductList, canActivate: [authGuard] },
  { path: 'gateaux', component: Gateaux, canActivate: [authGuard] },
  { path: 'menu', component: Menu, canActivate: [authGuard] },
  { path: 'node-commandes', component: NodeCommandes, canActivate: [authGuard] },
  {
    path: 'mes-bdd',
    component: MesBdd,
    canActivate: [authGuard],
    children: [
      { path: 'structure', component: MesBddStructure },
      { path: 'utilisateurs', component: MesBddUtilisateurs },
      { path: 'données', component: MesBddDonnees },
      { path: '', redirectTo: 'structure', pathMatch: 'full' }
    ]
  }
];