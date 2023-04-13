import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScamazonComponent } from './scamazon/scamazon.component';
import { InformationComponent } from './information/information.component';
import { ComputingMachineComponent } from './computing-machine/computing-machine.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'scamazon', component: ScamazonComponent },
  { path: 'information', component: InformationComponent },
  { path: 'computing-machine', component: ComputingMachineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
