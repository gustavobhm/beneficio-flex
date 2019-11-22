import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxCurrencyModule } from "ngx-currency";
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ToastrModule } from 'ngx-toastr';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvisoComponent } from './components/aviso/aviso.component';
import { ReembolsoComponent } from './components/reembolso/reembolso.component';
import { ReportComponent } from './components/report/report.component';
import { BeneficioService } from './services/beneficio.service';
import { ReembolsoService } from './services/reembolso.service';
import { SecaoService } from './services/secao.service';
import { UsuarioService } from './services/usuario.service';
import { ChartModule } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { ReportService } from './services/report.service';

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
    ReembolsoComponent,
    AvisoComponent,
    ReportComponent
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
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      progressAnimation: "decreasing"
    }),
    TextareaAutosizeModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxUpperCaseDirectiveModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.none,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#4caf50',
      secondaryColour: '#4caf50',
      tertiaryColour: '#4caf50',
      fullScreenBackdrop: true
    }),
    ChartModule
  ],
  providers: [
    BeneficioService,
    ReembolsoService,
    SecaoService,
    UsuarioService,
    ReportService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('pt-br');
  }

}
