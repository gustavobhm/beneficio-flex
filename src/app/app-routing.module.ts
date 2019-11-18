import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficioComponent } from './beneficio/beneficio.component';
import { AvisoComponent } from './aviso/aviso.component';


const routes: Routes = [
  { path: "", redirectTo: "beneficio", pathMatch: "full" },
  { path: "beneficio", component: BeneficioComponent },
  { path: "aviso", component: AvisoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
