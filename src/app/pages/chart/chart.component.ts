import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart , registerables } from 'chart.js';
import { ChartService } from 'src/app/domine/chart/chart.service';
Chart.register(...registerables)









@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  constructor(private http: HttpClient ,private service : ChartService ) { }

  ngOnInit(): void {
    
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','barchart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'doughnut','dochart');
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'polarArea','pochart');

        this.RenderChart(this.labeldata,this.realdata,this.colordata,'radar','rochart');

         
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
         
        }
      }
    });

    


  }


}
