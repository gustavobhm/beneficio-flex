import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from '../models/beneficio';

//const API = 'http://dk01.cremesp.org.br:100??/beneficios';
const API = 'http://localhost:1521/beneficios';


@Injectable({ providedIn: 'root' })
export class BeneficioService {

  constructor(private http: HttpClient) { }

  listarBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(API);
  }

}
