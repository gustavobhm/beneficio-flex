import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
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

  beneficios = [
    'Despesas não cobertas por Plano Odontológico.',
    'Despesas não cobertas pelo Plano de Saúde.',
    'Medicamentos.',
    'Óculos e lentes de contato.',
    'Academia.',
    'Idiomas.',
    'Educação e Cultura.',
    'Filhos Recém Nascidos (De 0 até 2 anos).'
  ]

  beneficio: Beneficio = new Beneficio(0, 0, "", 0, 0);
  selected: number;
  newColor: string;

  registerForm: FormGroup;
  submitted = false;

  today: Date = new Date();

  //maxDate: Date = new Date(Date.now());

  constructor(private service: BeneficioService, private formBuilder: FormBuilder,private location: Location) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      solicitante: ['', [Validators.required, Validators.minLength(3)]],
      secao: ['', Validators.required],
      //data: ['', [Validators.required, Validators.minLength(8)]],
      valor: ['', [Validators.required, Validators.minLength(10)]],
      tipoBeneficio: ['', Validators.required]
    });

  }

  public adicionarBeneficio() {
    let resp = this.service.adicionarBeneficio(this.beneficio);
    //resp.subscribe((data) => this.message = data);
    resp = this.service.adicionarBeneficio(this.beneficio);
    //console.log(resp);
  }

  printScreen() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    /*console.log("sucesso");*/

    this.adicionarBeneficio();

    this.printScreen();

    this.reset();

    /*// display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));*/
  }

  reset() {
    this.submitted = false;
    location.reload();
    //this.registerForm.reset();
  }

}
