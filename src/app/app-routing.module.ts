import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoComponent } from './components/aviso/aviso.component';
import { ReembolsoComponent } from './components/reembolso/reembolso.component';
import { ReportComponent } from './components/report/report.component';


const routes: Routes = [
  { path: "", redirectTo: "reembolso", pathMatch: "full" },
  { path: "reembolso", component: ReembolsoComponent },
  { path: "report", component: ReportComponent },
  { path: "aviso", component: AvisoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
