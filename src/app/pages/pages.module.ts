import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { CurrenciesComponent } from './currency-selector/currencies/currencies.component';
import { CurrencySelectorComponent } from './currency-selector/currency-selector.component';
import { CardsComponent } from './cards/cards.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'details', component: DetailsComponent },


];
@NgModule({
  declarations: [
    HomePageComponent,
    CurrenciesComponent,
    CurrencySelectorComponent,
    CardsComponent,
    DetailsComponent,



  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class PagesModule { }
