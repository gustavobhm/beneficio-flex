import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficioService } from './beneficio.service';
import { BeneficioComponent } from './beneficio/beneficio.component';

@NgModule({
  declarations: [
    AppComponent,
    BeneficioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BeneficioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
