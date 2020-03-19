import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { ApiConfiguration } from './api.configuration';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiConfiguration,
    ApiService
  ]
})
export class ApiModule { }
