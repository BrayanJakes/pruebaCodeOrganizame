import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';

import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';

import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { reducer } from './store/reducer/employee.reducer';
import { EmployeeEffects } from './store/effects/employee.effects';

export const reducers: ActionReducerMap<any> = {
  employee: reducer
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-2yvwk7ce.us.auth0.com',
      clientId: 'frgKRSMj044tCF5bStacebz0HcqxJj8a',
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EmployeeEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
