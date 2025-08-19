import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user()" style="display: flex; align-items: center; gap: 1em;">
      <img *ngIf="user()?.picture" [src]="user()?.picture" alt="avatar" width="36" height="36" style="border-radius: 50%; box-shadow: 0 1px 4px #0002;" />
      <span style="font-weight: 500;">{{ user()?.name }}</span>
      <button (click)="logout()" style="padding: 0.5em 1em; border: 1px solid #222; background: #fff; border-radius: 6px; cursor: pointer;">Se déconnecter</button>
    </div>
  `
})
export class LogoutComponent {
  user = signal<any | null>(null);

  constructor(private router: Router) {
    effect(() => {
      const u = localStorage.getItem('google_user');
      this.user.set(u ? JSON.parse(u) : null);
    });
  }

  logout() {
    localStorage.removeItem('google_user');
    this.user.set(null);
    this.router.navigateByUrl('/login');
  }
}
