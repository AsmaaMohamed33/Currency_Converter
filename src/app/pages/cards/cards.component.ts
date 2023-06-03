import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CurrencyServiceComponent } from 'src/app/domine/currency/currency-service.component copy';
import { Currency } from 'src/app/domine/currency/models/Currency';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() currencie: any;
  gridColumns = 3;
  @Input() elements: any[] = [];
  @Input() changeCurrency;
  @Input() selectorId;
  @Input() resultFrom
  @Input() resultTo
  @Input() resultInfo
  @Input() results
  public elementCurrenciesList;
  currency!: Currency;


  constructor(private service: CurrencyServiceComponent) { }



  ngOnInit(): void {

    let localData = localStorage.getItem(this.selectorId);
    console.log(localData)
    this.elementCurrenciesList = document.getElementById('currenciesList ' + this.selectorId)
    console.log(this.elementCurrenciesList)
  }

  private selectCurrencyOnStart() {
    let data
    let localData = localStorage.getItem(this.selectorId);

    if (localData)
      data = this.service.getCurrencies().find(element => element.name == localData);
    if (!data)
      data = this.service.getCurrencies().find(element => element.name == (this.selectorId == 'from' ? 'EUR' : 'USD'));
    if (data)
      this.selectCurrency(data);
  }

  ngAfterViewInit(): void {

    this.elementCurrenciesList = document.getElementById('currenciesList ' + this.selectorId)
    this.selectCurrencyOnStart();

  }

  selectCurrency = (currency: Currency): void => {
    this.changeCurrency(currency);
    localStorage.setItem(this.selectorId, currency.name);
  }

}