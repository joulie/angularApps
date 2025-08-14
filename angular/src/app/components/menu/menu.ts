import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common'; // <-- Ajoute NgIf
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  url?: string;
  routerLink?: string;
}
interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule], 
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  sections: MenuSection[] = [
    {
      title: 'Inventaire',
      items: [
        { label: 'Product-list', routerLink: '/product-list' },
        { label: 'Produits', routerLink: '/produits' }
      ]
    },
    
    {
      title: 'Mes liens',
      items: [
        { label: 'GitHub', url: 'https://github.com/joulie/angularApps' }
      ]
    },
    
    {
      title: 'Node.js',
      items: [
        { label: 'Commandes node utiles', url: 'https://app.pluralsight.com/library/courses/nodejs-big-picture' },
        { label: 'mes BDD du site inventaire', url: 'https://app.pluralsight.com/library/courses/nodejs-getting-started' }
      ]
    }
  ];

  serverCommands: string[] = [
    'node server.js',
    'npm start'
  ];
}