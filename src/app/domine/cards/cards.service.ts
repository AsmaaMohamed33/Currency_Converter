import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../currency/models/Currency';
import { Response } from 'src/app/core/layout/models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  currencies:Currency[] = []
  lastUpdate;

  constructor(private http: HttpClient) { 
    console.log(this.currencies)
  }

 public get(){
  return this.currencies

}

public getCurrenciesPromise() {
  return new Promise<any>((resolve, reject) => {
  if(this.currencies.length==0)
  {
    this.http.get<any>('http://data.fixer.io/api/latest?access_key=66e1d2a6d2970cf1bb86fcf58a411012&symbols=USD,AUD,CAD,PLN,MXN,All,AFN,AZN,AMD').subscribe(data => {
      for (var key in data.rates){
        var value = data.rates[key];
        let currency:Currency = {rate: value, full_name: '', name: key, symbol: ''};
        this.currencies.push(currency);
      }
        this.lastUpdate = data.time_last_update_utc;
      this.http.get<any>('http://data.fixer.io/api/latest?access_key=66e1d2a6d2970cf1bb86fcf58a411012&symbols=USD,AUD,CAD,PLN,MXN,USD,AUD,CAD,PLN').subscribe(data => {

        data.forEach(currency => {
            let name = Object.keys(currency.currencies)[0]
            var index = this.currencies.findIndex(element => element.name==name);
            if (index!=-1)
              this.currencies[index] = {...this.currencies[index], full_name: currency.currencies[name].name, symbol: currency.currencies[name].symbol}
        }
        )
        resolve(this.currencies);
      },
        () => {
          reject();
        }
      )
    },
      () => {
        reject();
      }
    )
  }
  else {
    resolve(this.currencies);
  }
})}
  
        

}
