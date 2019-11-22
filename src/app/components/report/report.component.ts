import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
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

  private pieData: DataPieChartView[] = [];

  constructor(
    private reportService: ReportService,
    private datepipe: DatePipe) { }

  ngOnInit() {

    this.initialDate.setMonth(this.initialDate.getMonth() - 3);
    this.rangeDate = [this.initialDate, this.finalDate];

    this.chartConfig();
    this.buildChart();

  }

  chartConfig() {
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

  async buildChart() {

    this.formatedInitialDate = this.datepipe.transform(this.rangeDate[0], 'dd/MM/yyyy');
    this.formatedFinalDate = this.datepipe.transform(this.rangeDate[1], 'dd/MM/yyyy');
    this.pieData = await this.reportService.getDataForPieChartBy(this.formatedInitialDate, this.formatedFinalDate);

    Highcharts.chart(this.container.nativeElement, {
      colors:
        //['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#40dbdb', '#f032e6', '#dbc218', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
        //'#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        //['rgb(230, 25, 75, 0.7)', 'rgb(60, 180, 75, 0.7)', 'rgb(67, 99, 216, 0.7)', 'rgb(245, 130, 49, 0.7)', 'rgb(145, 30, 180, 0.7)', 'rgb(64, 219, 219, 0.7)', 'rgb(240, 50, 230, 0.7)', 'rgb(219, 194, 24, 0.7)', 'rgb(188, 246, 12, 0.7)', 'rgb(250, 190, 190, 0.7)', 'rgb(0, 128, 128, 0.7)'],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        marginTop: 65
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
        //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        headerFormat: '',
        //pointFormat: '<span style="color:{point.color};font-size:11px;">{point.name}</span><br><span style="font-size:11px;">{point.y} solicitações.</span>'
        pointFormat: '<span style="color:{point.color};font-size:11px;font-weight: bold;">{point.y} Solicitações de Reembolso.</span>'
      },
      xAxis: {
        type: 'category',
        showEmpty: false
      },
      yAxis: {
        title: {
          text: 'Solicitações de Reembolso'
        },
        //minorGridLineWidth: 1,
        //gridLineWidth: 1,
        //alternateGridColor: 'rgb(240,240,240,0.1)',
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
          opacity: 0.7,
          dataLabels: {
            enabled: true,
            //format: '{point.name}: {point.y:.1f}%'
            format: '<span style="color:{point.color};font-size:11px;font-weight: bold;">{point.y}</span>'
          },
          events: {
            click: (event) => {
              //alert('you clicked something' + event);
              console.log(event.point.options.name);
            },
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
        type: undefined,
        /*name: 'Quantidade de solicitações',*/
        data: this.pieData
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
              },
            }
          }
        },
        series: [
          {
            type: 'column',
            name: "Despesas não cobertas por Plano Odontológico.",
            id: "Despesas não cobertas por Plano Odontológico.",
            data: [
              ["19/11/2019", 1]
            ]
          },
          {
            type: 'column',
            name: "Educação e Cultura.",
            id: "Educação e Cultura.",
            data: [
              ["18/11/2019", 5],
              ["19/11/2019", 4]
            ]
          }
        ]
      }
    });
  }

  onKeydown(event) {
    event.preventDefault();
  }

}
