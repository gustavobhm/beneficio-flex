import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/usuario';

const API = 'http://api.cremesp.org.br:8000/usuarios';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(API + '?ativos=true');
  }

}
