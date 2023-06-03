import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';









@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    NgChartsModule 
],
exports: [
  CommonModule,
  AngularMaterialModule,
  ReactiveFormsModule,
 FlexLayoutModule,
  RouterModule,
  HttpClientModule,
  NgChartsModule

 
 
],
})
export class SharedModule { }
