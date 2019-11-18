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
import { NgxMaskModule } from 'ngx-mask';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeneficioService } from './beneficio.service';
import { BeneficioComponent } from './beneficio/beneficio.component';
import { SecaoService } from './secao.service';
import { UsuarioService } from './usuario.service';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AvisoComponent } from './aviso/aviso.component';
import { ToastrModule } from 'ngx-toastr';

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
    BeneficioComponent,
    AvisoComponent
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
    })
  ],
  providers: [
    BeneficioService,
    SecaoService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('pt-br');
  }

}
