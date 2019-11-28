import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import More from 'highcharts/highcharts-more';
import * as Highcharts from "highcharts/highstock";
import Drilldown from 'highcharts/modules/drilldown';
import Exporting from 'highcharts/modules/exporting';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { DataPieChartView } from 'src/app/models/dataPieChartView';
import { ReportService } from 'src/app/services/report.service';

NoDataToDisplay(Highcharts);
More(Highcharts);
Drilldown(Highcharts);
Exporting(Highcharts);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild("container", { read: ElementRef, static: true }) container: ElementRef;

  private initialDate: Date = new Date();
  private finalDate: Date = new Date();
  private rangeDate: Date[];

  private formatedInitialDate: string;
  private formatedFinalDate: string;

  private chart: Highcharts.Chart;

  constructor(
    private reportService: ReportService,
    private datepipe: DatePipe) { }

  ngOnInit() {

    this.initialDate.setMonth(this.initialDate.getMonth() - 3);
    this.rangeDate = [this.initialDate, this.finalDate];

    this.configChart();
    this.buildChart();

  }

  private configChart() {
    Highcharts.setOptions({
      lang: {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        loading: 'Atualizando o gráfico...aguarde',
        contextButtonTitle: 'Exportar gráfico',
        decimalPoint: ',',
        thousandsSep: '.',
        viewFullscreen: 'Vizualizar em tela cheia',
        downloadJPEG: 'Baixar imagem JPEG',
        downloadPDF: 'Baixar arquivo PDF',
        downloadPNG: 'Baixar imagem PNG',
        downloadSVG: 'Baixar vetor SVG',
        printChart: 'Imprimir gráfico',
        rangeSelectorFrom: 'De',
        rangeSelectorTo: 'Para',
        rangeSelectorZoom: 'Zoom',
        resetZoom: 'Limpar Zoom',
        resetZoomTitle: 'Voltar Zoom para nível 1:1',
        drillUpText: '<< voltar',
        noData: 'Sem dados para o período!'
      }
    });
  }

  private async buildChart() {

    this.formatedInitialDate = this.datepipe.transform(this.rangeDate[0], 'dd/MM/yyyy');
    this.formatedFinalDate = this.datepipe.transform(this.rangeDate[1], 'dd/MM/yyyy');
    const pieData = await this.reportService.getDataForPieChartBy(this.formatedInitialDate, this.formatedFinalDate);
    this.createDrilldown(pieData);

    this.chart = Highcharts.chart(this.container.nativeElement, {
      colors: ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#40dbdb', '#f032e6', '#dbc218', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        marginTop: 65,
        events: {
          drilldown: (event) => { }
        }
      },
      title: {
        text: ''
      },
      subtitle: {
        text: 'Quantidade de solicitações no período de ' + this.formatedInitialDate + ' à ' + this.formatedFinalDate + '.',
        y: 17
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color};font-size:11px;font-weight: bold;">{point.y} Solicitações de Reembolso.</span>'
      },
      xAxis: {
        type: 'category',
        showEmpty: false,
        labels: {
          rotation: -60
        }
      },
      yAxis: {
        minTickInterval: 1,
        title: {
          text: 'Solicitações de Reembolso'
        },
        showEmpty: false
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: 'rgb(102, 102, 102)',
          fontWeight: '500'
        }
      },
      plotOptions: {
        series: {
          marker: {
            symbol: 'circle',
            radius: 5
          },
          lineWidth: 3,
          opacity: 0.7,
          dataLabels: {
            enabled: true,
            format: '<span style="color:{point.color};font-size:11px;font-weight: bold;">{point.y}</span>'
          },
          events: {
            legendItemClick: (event) => {
              event.preventDefault();
            }
          }
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 3,
          dataLabels: {
            enabled: true,
            format: '<span style="font-size:10px;color:{point.color};font-weight:500;">{point.name} {point.percentage:.1f} % </span>'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Solicitações Reembolso',
        data: pieData
      }],
      drilldown: {
        activeDataLabelStyle: {
          textDecoration: 'none'
        },
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            align: 'left',
            verticalAlign: 'top',
            x: 0,
            y: -5
          },
          theme: {
            fill: 'white',
            stroke: 'rgb(230,230,230)',
            'stroke-width': 2,
            r: 5,
            states: {
              hover: {
                fill: 'rgb(76,175,80,0.1)',
                stroke: 'rgb(76,175,80)'
              }
            }
          }
        }
      }
    });
  }

  private async createDrilldown(pieData: DataPieChartView[]) {

    var drilldownList: string = '[';

    for (const piece of pieData) {

      const drilldownData = await this.reportService.getDataForDrilldownChartBy(this.formatedInitialDate, this.formatedFinalDate, piece.name);

      drilldownList += '{' +
        '"type": "line",' +
        `"name": "${piece.name}",` +
        `"id": "${piece.name}",` +
        `"data": ${JSON.stringify(drilldownData)} },`;
    }

    drilldownList = drilldownList.replace(/,$/, "]");

    this.updateChart(drilldownList);
  }

  private updateChart(drilldownList: string) {
    this.chart.update({
      drilldown: {
        series: JSON.parse(drilldownList)
      }
    });
  }

  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
  }

}
