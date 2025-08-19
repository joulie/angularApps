import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function authGuard() {
  // Vérifie la présence d'un profil utilisateur dans le localStorage
  const user = localStorage.getItem('google_user');
  if (user) {
    return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
}
