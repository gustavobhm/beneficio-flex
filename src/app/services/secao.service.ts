import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Secao } from '../models/secao';

//const API = 'http://dk01.cremesp.org.br:10006/secoes';
const API = 'http://dev.cremesp.net:10006/secoes';

@Injectable({ providedIn: 'root' })
export class SecaoService {

  constructor(private http: HttpClient) { }

  listarSecoes(): Observable<Secao[]> {
    return this.http.get<Secao[]>(API);
  }

}
