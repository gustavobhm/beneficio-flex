import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Usuario } from 'src/usuario';
import { Beneficio } from '../../models/beneficio';
import { Reembolso } from '../../models/reembolso';
import { Secao } from '../../models/secao';
import { BeneficioService } from '../../services/beneficio.service';
import { ReembolsoService } from '../../services/reembolso.service';
import { SecaoService } from '../../services/secao.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.css']
})
export class ReembolsoComponent implements OnInit {


  private reembolso: Reembolso = new Reembolso();

  private usuarioData: Usuario[] = [];
  private usuarios: Usuario[] = [];
  private secoes: Secao[] = [];
  private beneficios: Beneficio[] = [];

  private submitted: boolean = false;
  private loading: boolean = false;

  private registerForm: FormGroup;

  private filterUsuarios: Subject<string> = new Subject();

  private selected: number;
  private newColor: string;

  constructor(
    private reembolsoService: ReembolsoService,
    private secaoService: SecaoService,
    private usuarioService: UsuarioService,
    private beneficioService: BeneficioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      solicitante: ['', [Validators.required, Validators.minLength(3)]],
      secao: ['', Validators.required],
      data: [],
      valor: ['', [Validators.required, Validators.minLength(10)]],
      tipoBeneficio: ['', [this.beneficioValidator]],
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

    this.beneficioService.listarBeneficios()
      .subscribe(
        data => this.beneficios = data,
        error => console.log(error));

    this.filterUsuarios.pipe(debounceTime(500))
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

  private print() {
    document.title = "Benefício Flex - Cremesp";
    window.print();
  }

  private save() {

    this.loading = true;

    this.reembolsoService.salvarReembolso(this.reembolso)
      .subscribe(
        data => {
          this.toastr.success('', 'Solicitação de reembolso salva com sucesso!')
            .onHidden.subscribe(() => location.reload());
        },
        error => {
          this.toastr.error(error.message, 'A solicitação de reembolso não foi salva!')
            .onHidden.subscribe(() => location.reload());
        }
      ).add(() => {
        this.resetForm();
      });
  }

  private resetForm() {
    this.reembolso = new Reembolso();
    this.newColor = '#AAAAAA';
    this.selected = -1;
  }

  private listUsers(event: any) {
    this.filterUsuarios.next(event.target.value);
  }

  private beneficioValidator(control: FormControl): { [key: string]: boolean } | null {
    return !control.value.descricao ? { 'beneficioNotSelected': true } : null;
  }

}