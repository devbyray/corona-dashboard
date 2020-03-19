import { Injectable } from '@angular/core';
    
@Injectable({
    providedIn: 'root'
})
export class ApiConfiguration {
  private baseUrl = 'https://coronavirus-tracker-api.herokuapp.com';
  private version = '/v2';
  
  public baseUrlWithVersion = this.baseUrl + this.version;

  public locationsEndpoint = '/locations';
  public latestEndpoint = '/latest';
  public netherlandsParam = '?country_code=NL';
}