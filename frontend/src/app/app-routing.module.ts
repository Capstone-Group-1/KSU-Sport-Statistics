import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:  '', component: HomeComponent },
  { path: 'example', component: ExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
