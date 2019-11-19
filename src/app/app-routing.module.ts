import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoComponent } from './aviso/aviso.component';
import { ReembolsoComponent } from './reembolso/reembolso.component';


const routes: Routes = [
  { path: "", redirectTo: "reembolso", pathMatch: "full" },
  { path: "reembolso", component: ReembolsoComponent },
  { path: "aviso", component: AvisoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
