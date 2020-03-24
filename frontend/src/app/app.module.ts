import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ExampleComponent } from './example/example.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatAutocompleteModule, MatInputModule } from  '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';
import { RosterComponent } from './team/roster/roster.component';
import { StatsComponent } from './team/stats/stats.component';
import { ProgressComponent } from './team/progress/progress.component';
import { PlayerComponent } from './team/roster/player/player.component';
import { PlayerInfoComponent } from './team/roster/player/player-info/player-info.component';
import { PlayerStatsComponent } from './team/roster/player/player-stats/player-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent,
    TeamComponent,
    RosterComponent,
    StatsComponent,
    ProgressComponent,
    PlayerComponent,
    PlayerInfoComponent,
    PlayerStatsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [PlayerComponent],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
