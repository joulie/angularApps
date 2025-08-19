import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { LoginComponent } from './components/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SocialLoginModule,
    App,
    LoginComponent
  ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('VOTRE_CLIENT_ID_GOOGLE')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
