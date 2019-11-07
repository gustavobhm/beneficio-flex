import { Component, OnInit } from '@angular/core';
//import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Beneficio } from '../beneficio';
import { BeneficioService } from '../beneficio.service';

//declare var $: any;

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.css']
})
export class BeneficioComponent implements OnInit {

  //datepickerConfig: Partial<BsDatepickerConfig>;

  beneficio: Beneficio = new Beneficio(0, 0, "", 0, 0);
  message: any;
  colorStyle: any;

  bsValue: Date = new Date();
  minDate: Date = new Date();

  //constructor(private service: BeneficioService, private bsLocaleService: BsLocaleService) {
  constructor(private service: BeneficioService) {

    /*this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      });*/

  }

  ngOnInit() { }

  public adicionarBeneficio() {
    let resp = this.service.adicionarBeneficio(this.beneficio);
    //resp.subscribe((data) => this.message = data);
    resp = this.service.adicionarBeneficio(this.beneficio);
    console.log(resp);
  }


  onOptionsSelected(event) {
    let selectComp = event.target;

    this.colorStyle = "#495057";

    console.log(selectComp.value);
  }

  onCheckRadiosSelected(label){

    label.colorStyle = "green";

    console.log(label);
  }

  onPrint() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

}
