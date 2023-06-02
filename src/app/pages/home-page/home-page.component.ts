import { Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/domine/cards/cards.service';
import { CurrencyServiceComponent } from 'src/app/domine/currency/currency-service.component copy';
import { Currency } from 'src/app/domine/currency/models/Currency';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  title = 'currency-exchange';
  public isDataAvailable = false;
  public failedToLoad = false;
  _from;
  private to;
  public amount;
  public amount_value;
  @ViewChild('from') fromCmp;
  @ViewChild('to') toCmp;
  @ViewChild('amount_input', { static: false }) amount_input!: ElementRef;;
  @ViewChild('submitBtn', {static: false}) submitBtn;
  @ViewChild('formExchange', {static: false}) formExchange;
  elements: any[] =[]
  currencies : any[]=[]
  results: any[] =[]
  @Input() detail : boolean = true
  @Input() card : boolean = true
  renderer!: Renderer2; 


  @Input()public resultFrom;
  @Input()public fromName;
  public resultFromCard!: string;
  @Input()public resultTo;
  public resultToCard!: string;
  public resultInfo;
  @Input() public isResult = false;
  public lastUpdate;
  currencie: any;
  @Input() value: boolean = true;
  @Input() fromValue: boolean = false;
  
  get from_symbol() {
    return this._from.symbol;
  }

  constructor(public service: CurrencyServiceComponent, private cardServie : CardsService , private router : Router) {
   
  }
  



  public selectFrom = (currency: Currency): void =>{
    this._from=currency;
    if(this.isResult)
      this.exchange();

  }

  public selectTo = (currency: Currency): void =>{
    this.to=currency;
    if(this.isResult)
      this.exchange();

  }

  changeAmountValue(){
    this.amount_value = (Math.round( this.amount_value * 100) / 100).toFixed(2);
    localStorage.setItem("amount", this.amount_value);
    if(this.isResult)
      this.exchange();
  }


  public switchCurrencies(){
    let temp : Currency = this._from;
    this.fromCmp.selectCurrency(this.to);
    this.toCmp.selectCurrency(temp);
    if(this.isResult)
      this.exchange();
  }

  public exchange(){
    let rateBase = this.to.rate/this._from.rate;
    let result = this.amount_value*rateBase;
    this.resultFrom = this.amount_value + " " + (this._from.full_name ? this._from.full_name :  this._from.name) + " =";
    this.resultTo = (result).toFixed(5) + " " + (this.to.full_name ? this.to.full_name :  this.to.name);
    this.resultInfo = (1).toFixed(2) + " " + this._from.name + " = " + rateBase.toFixed(6) + " " +this.to.name + '\n '
                      +  (1).toFixed(2) + " " + this.to.name + " = " + (1/rateBase).toFixed(6) + " " +this._from.name ;
   this.fromName= this._from.full_name
   localStorage.setItem("fromName" ,this.fromName)
   localStorage.setItem("fromChart" , this._from.name)
   localStorage.setItem("toChart" , this.to.name)
   localStorage.setItem("fromRate" , this._from.rate)
   localStorage.setItem("toRate" , this.to.rate)
   console.log(this.to)
   console.log(this._from)

     
  }

  onSubmit(): void {
    this.exchange();
    this.isResult= true;
    var date = new Date(this.service.getLastUpdate());
    this.lastUpdate = date.toLocaleString()  + " UTC";
    this.currencie= this.service.getCurrencies().slice(0,9)
    this.currencie.forEach(element => {
      let rateBase = this.to.rate / element.rate;
      let result = this.amount_value * rateBase;
      const resultToCard = (result).toFixed(5) + " " + (element.name ? element.name : element.name) ;
      const resultFromCard = this.amount_value + " " + (this._from.name ? this._from.name : this._from.name) + " =";
      this.results.push({ resultFromCard, resultToCard });
    });
  }

  ngOnInit(): void {
    this.service.getCurrenciesPromise().then((data) => {
      this._from = data[0];
      this.to = data[1];
      this.isDataAvailable = true

    },
      () =>{
      this.failedToLoad = true;
      }
    );

    let localAmount = localStorage.getItem("amount");
    this.amount_value= localAmount 
  }



  windowResize(): void{
    this.submitBtn.nativeElement.style.width = this.formExchange.nativeElement.style.width;
  }

  reset(){
    window.location.reload()
    this.elements= [] ;
   localStorage.clear();
  }

  ngAfterViewInit(): void { 
    setTimeout(() => this.amount_input.nativeElement.keyup(), 0);
    this.checkValue()
   
  }

  openDetails() {
    this.router.navigate(['/details']);
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  checkValue(){
    if (this.amount_value){
      console.log('enter value ')
      this.value=false
      console.log(this.value)
    }else{
      this.value=true
      console.log('not enter  ')
    }
  }
}
