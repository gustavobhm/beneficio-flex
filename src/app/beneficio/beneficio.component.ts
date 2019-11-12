import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficio } from '../beneficio';
import { BeneficioService } from '../beneficio.service';
import { Secao } from '../secao';
import { SecaoService } from '../secao.service';

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

  secoes: Secao[];

  beneficio: Beneficio = new Beneficio();
  submitted: boolean = false;

  registerForm: FormGroup;

  constructor(
    private beneficioService: BeneficioService,
    private secaoService: SecaoService,
    private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      solicitante: ['', [Validators.required, Validators.minLength(3)]],
      secao: ['', Validators.required],
      data: [],
      valor: ['', [Validators.required, Validators.minLength(10)]],
      tipoBeneficio: ['', Validators.required],
      observacao: []
    });

    this.secaoService.listarSecoes()
      .subscribe(
        data => this.secoes = data,
        error => console.log(error));

  }


  printScreen() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.printScreen();

    this.save();

  }

  reset() {
    this.submitted = false;
    this.beneficio = new Beneficio();
    location.reload();
  }

  save() {
    /*this.beneficioService.salvarBeneficio(this.beneficio)
      .subscribe(data => console.log(data), error => console.log(error));*/
    console.log(this.beneficio);
    //this.reset();
  }

}
