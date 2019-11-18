import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  private beneficios: string[] = [
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

  private usuarioData: Usuario[] = [];
  private usuarios: Usuario[] = [];
  private secoes: Secao[] = [];

  private subject: Subject<string> = new Subject();

  private loading: boolean = false;

  private selected: number;
  private newColor: string;

  constructor(
    private beneficioService: BeneficioService,
    private secaoService: SecaoService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

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

    this.subject.pipe(debounceTime(500))
      .subscribe(
        nomeUsuario => {
          this.usuarios = nomeUsuario.length > 3 ? this.usuarioData.filter(v => v.nome.match(nomeUsuario)) : [];
        });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid)
      return;

    this.print();
    this.save();

    this.submitted = false;

  }

  print() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

  save() {
    this.loading = true;

    /*this.beneficioService.salvarBeneficio(this.beneficio)
      .subscribe(data => console.log(data), error => console.log(error));*/
    //console.log(this.beneficio);

    //this.goToAviso();

    this.resetForm();

    this.toastr.success('Solicitação de reembolso salva com sucesso!', '')
      //.onHidden.subscribe(() => this.loading = false);
      .onHidden.subscribe(() => location.reload());

  }

  resetForm() {
    //this.beneficio = new Beneficio();
    this.registerForm.reset();
    this.beneficio.secao = "";
    this.selected = -1;
    this.newColor = '#AAAAAA';

  }

  goToAviso() {
    this.router.navigate(['/aviso']);
  }

  listUsers(event: any) {
    this.subject.next(event.target.value);
  }


}