import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {ExampleApiService} from './services/example-api.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ExampleComponent } from './example/example.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [ExampleApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
