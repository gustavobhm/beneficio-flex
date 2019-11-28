import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataDrilldownChartView } from '../models/dataDrilldownChartView';
import { DataPieChartView } from '../models/dataPieChartView';

//const API = 'http://localhost:1521/report/filtrar?initialDate=18/11/2019 00:00:00&finalDate=18/11/2019 23:59:59';
const API = 'http://localhost:1521/report';


@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(private http: HttpClient) { }

  async getDataForPieChartBy(initialDate: string, finalDate: string): Promise<DataPieChartView[]> {
    return await this.http.get<DataPieChartView[]>(API + '/dataPieChart?initialDate=' + initialDate + '&finalDate=' + finalDate).toPromise();
  }

  async getDataForDrilldownChartBy(initialDate: string, finalDate: string, descricaoBeneficio: string): Promise<DataDrilldownChartView[]> {
    return await this.http.get<DataDrilldownChartView[]>(API + '/dataDrilldownChart?initialDate=' + initialDate + '&finalDate=' + finalDate + '&descricaoBeneficio=' + descricaoBeneficio).toPromise();
  }

}
