import { Component } from '@angular/core';

@Component({
  selector: 'app-mes-bdd-donnees',
  imports: [],
  templateUrl: './mes-bdd-donnees.html',
  styleUrl: './mes-bdd-donnees.css',
  standalone: true
})
export class MesBddDonnees {
  copyToClipboard(element: HTMLElement) {
    const text = element.innerText;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      // fallback pour vieux navigateurs
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
}
