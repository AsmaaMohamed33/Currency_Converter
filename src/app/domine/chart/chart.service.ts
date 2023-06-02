import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../currency/models/Currency';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private API_KEY = '850f0131eb0e75cac7b51385';
  private apiUrl = 'https://api.exchangeratesapi.io';
  currency!: Currency;
  constructor(private http: HttpClient) { }

  async getRatesHistory(from: string, to: string, startDate: string, endDate: string) {
    try {
      const endpoint = `/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${to}&base=${from}&places=3`;
      const response = await this.http.get<any>(`${this.apiUrl}${endpoint}`).toPromise();

      if (!("data" in response) || !("rates" in response.data)) {
        throw new Error("Response error, invalid data received.");
      }

      return response.data.rates;
      
    } catch (error) {
      console.log("Error on getRates\n", error);
      return null;
    }
  }
}
  

