import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MsalGuard, MsalModule, MsalRedirectComponent, MsalInterceptor } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
          clientId: environment.CLIENTID,
          authority: environment.AUTHORITY_URL,
          redirectUri: environment.REDIRECT_URL,
          postLogoutRedirectUri: environment.REDIRECT_URL
      },
      cache: {
          cacheLocation : BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
      }
  }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ["user.read"]
      } // MSAL Guard Configuration
  }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
