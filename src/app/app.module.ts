import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficioService } from './beneficio.service';
import { BeneficioComponent } from './beneficio/beneficio.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    BeneficioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [BeneficioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
