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
        { label: 'Assignments', routerLink: '/assignments' },
        { label: 'Gateaux', routerLink: '/gateaux' }
      ]
    },
    
    {
      title: 'My links',
      items: [
        { label: 'GitHub', url: 'https://github.com/joulie/' }
      ]
    },
    
    {
      title: 'install this software',
      items: [
        { label: 'Usefull commands', routerLink: '/node-commandes' },
        { label: 'My databases', routerLink: '/mes-bdd' }
      ]
    }
  ];

  serverCommands: string[] = [
    'node server.js',
    'npm start'
  ];
}