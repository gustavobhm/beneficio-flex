import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from '../models/beneficio';

const API = 'http://api.cremesp.org.br:8000/beneficio-flex/beneficios';


@Injectable({ providedIn: 'root' })
export class BeneficioService {

  constructor(private http: HttpClient) { }

  listarBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(API);
  }

}
