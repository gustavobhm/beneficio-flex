import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import Drilldown from 'highcharts/modules/drilldown';
import Exporting from 'highcharts/modules/exporting';

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

  initialDate: Date = new Date();
  finalDate: Date = new Date();
  rangeDate: Date[];

  constructor(private datepipe: DatePipe) { }

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
        drillUpText: '<< voltar'
      }
    });
  }

  buildChart() {
    Highcharts.chart(
      this.container.nativeElement, {
      colors: 
        /*['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],*/
        ['#e6194b', '#3cb44b',  '#4363d8', '#f58231', '#911eb4', '#40dbdb', '#f032e6', '#dbc218','#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
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
        text: 'Quantidade de solicitações no período de ' + this.datepipe.transform(this.rangeDate[0], 'dd/MM/yyyy') + ' à ' + this.datepipe.transform(this.rangeDate[1], 'dd/MM/yyyy') + '.',
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
        showEmpty: false
      },
      yAxis: {
        showEmpty: false
      },
      plotOptions: {
        series: {
          opacity: 0.7,
          dataLabels: {
            enabled: true,
            //format: '{point.name}: {point.y:.1f}%'
          },
          events: {
            click: (event) => {
              //alert('you clicked something' + event);
              console.log(event.point.options.name);
            },
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
        name: 'Quantidade de solicitações',
        data: [{
          name: 'Despesas não cobertas por Plano Odontológico.',
          drilldown: "Despesas não cobertas por Plano Odontológico.",
          y: 100
        }, {
          name: 'Despesas não cobertas pelo Plano de Saúde.',
          drilldown: 'Despesas não cobertas pelo Plano de Saúde.',
          y: 85
        }, {
          name: 'Medicamentos.',
          drilldown: 'Medicamentos.',
          y: 44
        }, {
          name: 'Óculos e lentes de contato.',
          drilldown: 'Óculos e lentes de contato.',
          y: 33
        }, {
          name: 'Academia.',
          drilldown: 'Academia.',
          y: 20
        }, {
          name: 'Idiomas.',
          drilldown: 'Idiomas.',
          y: 10
        }, {
          name: 'Educação e Cultura.',
          drilldown: 'Educação e Cultura.',
          y: 5
        }, {
          name: 'Filhos Recém Nascidos (De 0 até 2 anos).',
          drilldown: 'Filhos Recém Nascidos (De 0 até 2 anos).',
          y: 2
        }]
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
        series: [{
          type: 'column',
          name: "Despesas não cobertas por Plano Odontológico.",
          id: "Despesas não cobertas por Plano Odontológico.",
          data: [
            [
              "v65.0",
              0.1
            ],
            [
              "v64.0",
              1.3
            ],
            [
              "v63.0",
              53.02
            ],
            [
              "v62.0",
              1.4
            ],
            [
              "v61.0",
              0.88
            ],
            [
              "v60.0",
              0.56
            ],
            [
              "v59.0",
              0.45
            ]
          ]
        }]
      }
    });
  }

  onKeydown(event) {
    event.preventDefault();
  }

}
