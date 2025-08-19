import { Component, ElementRef, ViewChild, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = signal<any | null>(null);
  loggedIn = signal(false);
  @ViewChild('googleBtn') googleBtn?: ElementRef;
  private googleButtonInitialized = false;

  constructor(private router: Router) {
    effect(() => {
      if (this.loggedIn()) {
        this.router.navigateByUrl('/assignments');
      }
    });
  }

  ngAfterViewChecked() {
    if (!this.loggedIn() && this.googleBtn && !this.googleButtonInitialized) {
      this.tryInitGoogleButton();
    }
  }

  private tryInitGoogleButton(retry = 0) {
    if (typeof window !== 'undefined' && (window as any).google && (window as any).google.accounts && this.googleBtn) {
      this.googleButtonInitialized = true;
      const client_id = '359950909819-6rvaup5or4f001qsa96bvbk9v83si107.apps.googleusercontent.com';
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id,
        callback: (response: any) => this.handleCredentialResponse(response)
      });
      // @ts-ignore
      window.google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        { theme: 'outline', size: 'large' }
      );
    } else if (retry < 10) {
      setTimeout(() => this.tryInitGoogleButton(retry + 1), 300);
    }
  }

  handleCredentialResponse(response: any) {
    // Décoder le JWT si besoin, ou envoyer au backend
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  const userObj = JSON.parse(jsonPayload);
  this.user.set(userObj);
  this.loggedIn.set(true);
  localStorage.setItem('google_user', JSON.stringify(userObj));
  }

  signOut() {
  this.user.set(null);
  this.loggedIn.set(false);
  this.googleButtonInitialized = false;
  localStorage.removeItem('google_user');
  }
}
