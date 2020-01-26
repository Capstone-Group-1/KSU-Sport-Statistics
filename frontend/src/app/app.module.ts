import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ExampleApiService} from './services/example-api.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ExampleApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
