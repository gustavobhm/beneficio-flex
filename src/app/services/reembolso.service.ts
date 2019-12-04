import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reembolso } from '../models/reembolso';

const API = 'http://api.cremesp.org.br:8000/beneficio-flex/reembolsos';

@Injectable({ providedIn: 'root' })
export class ReembolsoService {

  constructor(private http: HttpClient) { }

  salvarReembolso(reembolso: Reembolso): Observable<Reembolso> {
    return this.http.post<Reembolso>(API, reembolso);
  }

}
