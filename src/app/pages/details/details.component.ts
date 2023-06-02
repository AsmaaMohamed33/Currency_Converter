import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LabelItem , Color } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ChartDataset } from 'chart.js';
import { ChartService } from 'src/app/domine/chart/chart.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 detail : boolean = false
 card : boolean = false
 fromValue: boolean = true;
public resultFrom;
public resultTo;
 fromName ;
 chart: any;
 currency1!: string;
 currency2!: string;
 rates!: any[];
 months: string[] = [];
 public isResult = true


 currencies = ['USD', 'EUR', 'GBP'];
  startDate = new Date('2022-01-01');
  endDate = new Date('2022-12-30');
 data: any;

 from ;
 to ;
 access_key
 fromRate;
 toRate;




  constructor(private http: HttpClient , private chartService : ChartService) { }

  ngOnInit(): void {
    this.fromName= localStorage.getItem("fromName")
    this.from = localStorage.getItem('fromChart')
    this.to= localStorage.getItem('toChart')
  }

  async onSubmit() {
      const  apiUrl = 'https://api.exchangeratesapi.io';
      this.from = localStorage.getItem('fromChart')
      this.to= localStorage.getItem('toChart')
      this.access_key = 'a52f9933127daf9416d4cbad93e51665'
      console.log(77777777777777777)
      const endpoint = `/timeseries?access_key=${this.access_key}&start_date=${this.startDate}&end_date=${this.endDate}&symbols=${this.to}&base=${this.from}&places=3`;
      const data = await fetch(`${apiUrl}${endpoint}`)
      .then(response => response.json());
      console.log(4444444444444)
      const monthlyRates = {};
      for (const date in data.rate) {
        const [year, month] = date.split("-").slice(0, 2);
        const rates = data.rates[date];
        if (!monthlyRates[year]) {
          monthlyRates[year] = {};
        }
       
       
             this.from = localStorage.getItem('from')
            this.to= localStorage.getItem('to')
            this.fromRate = localStorage.getItem("fromRate")
            this.toRate=  localStorage.getItem("toRate")
        monthlyRates[year][month] = rates[this.fromRate] / rates[this.toRate];
      }
      const labels = Object.keys(monthlyRates).map(year => `${year}-12`);
      
      // Create chart using Chart.js
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = document.getElementById("canvas") as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels:this.months,
          datasets: [{
            label: `${this.from} / ${this.to}`,
            data: Object.values(monthlyRates).map(rates => (rates as any)["12"]),
            borderColor: "blue",
            fill: false
          }]
        },
  options: {
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
        },
      },
    },
  }
});
  }

}
