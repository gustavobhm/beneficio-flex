import { Component, OnInit } from '@angular/core';
import { Beneficio } from '../beneficio';
import { BeneficioService } from '../beneficio.service';

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.css']
})
export class BeneficioComponent implements OnInit {

  mask = [' ', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/];
  //mask = ['R$ ', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/ ];
  beneficio: Beneficio = new Beneficio(0, 0, "", 0, 0);
  message: any;

  constructor(private service: BeneficioService) { }

  ngOnInit() {
  }

  public adicionarBeneficio() {
    let resp = this.service.adicionarBeneficio(this.beneficio);
    //resp.subscribe((data) => this.message = data);
    resp = this.service.adicionarBeneficio(this.beneficio);
    console.log(resp);
  }

}
