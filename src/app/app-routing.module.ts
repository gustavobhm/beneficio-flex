import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioComponent } from './beneficio/beneficio.component';


const routes: Routes = [
  { path: "", redirectTo: "beneficio", pathMatch: "full" },
  { path: "beneficio", component: BeneficioComponent }
  //{ path: "outro", component: OutroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
