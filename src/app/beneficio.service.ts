import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from './beneficio';

const API = 'http://dk01.cremesp.org.br:10020/beneficios';

@Injectable({ providedIn: 'root' })
export class BeneficioService {

  constructor(private http: HttpClient) { }

  salvarBeneficio(beneficio: Beneficio): Observable<Beneficio> {
    return this.http.post<Beneficio>(API, beneficio);
  }

}
