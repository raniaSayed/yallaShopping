import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    HttpClientModule,
} from 'angular5-social-login';


import { AuthServiceService } from './auth-service.service';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider("Your-Facebook-app-id")
        // },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("521472444901-f0ijnmhagvoa5e5st8hm4q1orksj4v9j.apps.googleusercontent.com")
        },
      ]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent],
    imports: [
    BrowserModule,
  SocialLoginModule,
HttpClientModule],
providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs,
  },
  AuthServiceService],
bootstrap: [AppComponent]
})
export class AppModule { }
