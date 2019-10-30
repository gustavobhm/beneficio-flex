import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  constructor(private http: HttpClient) { }

  public adicionarBeneficio(beneficio) {
    //console.log(JSON.parse('{"message": "Olá"}'));
    //return this.http.post("http://localhost:9090/beneficio", beneficio, { responseType: 'text' as 'json' });
    return JSON.parse('{"message": "Olá"}');
  }
}
