import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reembolso } from '../models/reembolso';

//const API = 'http://dk01.cremesp.org.br:100??/reembolsos';
const API = 'http://localhost:1521/reembolsos';

@Injectable({ providedIn: 'root' })
export class ReembolsoService {

  constructor(private http: HttpClient) { }

  salvarReembolso(reembolso: Reembolso): Observable<Reembolso> {
    return this.http.post<Reembolso>(API, reembolso);
  }

}
