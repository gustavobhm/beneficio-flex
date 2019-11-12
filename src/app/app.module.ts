import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficioService } from './beneficio.service';
import { BeneficioComponent } from './beneficio/beneficio.component';

defineLocale('pt-br', ptBrLocale);

export const customCurrencyMaskConfig = {
  align: null,
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};


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
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TextareaAutosizeModule
  ],
  providers: [BeneficioService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('pt-br');
  }

}
