import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScamazonComponent } from './scamazon/scamazon.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'scamazon', component: ScamazonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
