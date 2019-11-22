import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficio } from '../models/beneficio';
import { DataPieChartView } from '../models/dataPieChartView';
import { async } from 'q';

//const API = 'http://localhost:1521/report/filtrar?initialDate=18/11/2019 00:00:00&finalDate=18/11/2019 23:59:59';
const API = 'http://localhost:1521/report/filtrar';


@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(private http: HttpClient) { }

  async getDataForPieChartBy(initialDate: string, finalDate: string): Promise<DataPieChartView[]> {
    return await this.http.get<DataPieChartView[]>(API + '?initialDate=' + initialDate + ' 00:00:00&finalDate=' + finalDate + ' 23:59:59').toPromise();
  }

}
