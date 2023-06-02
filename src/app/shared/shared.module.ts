import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';









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
],
exports: [
  CommonModule,
  AngularMaterialModule,
  ReactiveFormsModule,
 FlexLayoutModule,
  RouterModule,
  HttpClientModule,

 
 
],
})
export class SharedModule { }
