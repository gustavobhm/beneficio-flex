import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Usuario } from 'src/usuario';
import { Beneficio } from '../beneficio';
import { BeneficioService } from '../beneficio.service';
import { Secao } from '../secao';
import { SecaoService } from '../secao.service';
import { UsuarioService } from '../usuario.service';

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



  private beneficio: Beneficio = new Beneficio();
  private submitted: boolean = false;

  private registerForm: FormGroup;

  private secoes: Secao[] = [];

  private usuarioData: Usuario[] = [];
  private usuarios: Usuario[] = [];

  private subject: Subject<string> = new Subject();

  constructor(
    private beneficioService: BeneficioService,
    private secaoService: SecaoService,
    private usuarioService: UsuarioService,
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

    this.usuarioService.listarUsuarios()
      .subscribe(
        data => this.usuarioData = data,
        error => console.log(error));

    this.subject.pipe(debounceTime(500)).subscribe(
      nomeUsuario => {
        this.usuarios = [];
        if (nomeUsuario.length > 3)
          this.usuarios = this.usuarioData.filter(v => v.nome.match(nomeUsuario));
      });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid)
      return;

    this.printScreen();
    this.save();
  }

  printScreen() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

  save() {
    /*this.beneficioService.salvarBeneficio(this.beneficio)
      .subscribe(data => console.log(data), error => console.log(error));*/
    console.log(this.beneficio);
    //this.reset();
  }

  reset() {
    this.submitted = false;
    this.beneficio = new Beneficio();
    location.reload();
  }

  listUsers(event: any) {
    this.subject.next(event.target.value);
  }

}