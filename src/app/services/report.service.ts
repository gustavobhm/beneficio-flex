import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataDrillDownSerie } from '../models/dataDrillDownSerie';
import { DataChartSerie } from '../models/dataChartSerie';

const API = 'http://api.cremesp.org.br:8000/beneficio-flex/report';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(private http: HttpClient) { }

  async getDataChartSeriesBy(initialDate: string, finalDate: string): Promise<DataChartSerie[]> {
    return await this.http.get<DataChartSerie[]>(API + '/dataPieChart?initialDate=' + initialDate + '&finalDate=' + finalDate).toPromise();
  }

  async getDataDrilldownSeriesBy(initialDate: string, finalDate: string, descricaoBeneficio: string): Promise<DataDrillDownSerie[]> {
    return await this.http.get<DataDrillDownSerie[]>(API + '/dataDrilldownChart?initialDate=' + initialDate + '&finalDate=' + finalDate + '&descricaoBeneficio=' + descricaoBeneficio).toPromise();
  }

}
