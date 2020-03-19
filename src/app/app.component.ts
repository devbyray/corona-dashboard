import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { take } from 'rxjs/operators';
import { DataFormat, Location, Latest } from './api/api.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public view = [700, 400];

  public dataTotal: DataFormat[] = [];
  public dataConfirmed: DataFormat[] = [];
  public dataDeaths: DataFormat[] = [];
  public dataRecovered: DataFormat[] = [];

  public gradient = true;
  public showLegend = false;
  public showLabels = true;
  public isDoughnut = true;
  public legendPosition = 'below';

  public colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // FIXME:
    // this.apiService.getLocationNL().pipe(take(1)).subscribe(response => {
    //   const locations = response.locations;
    //   this.netherlands = locations[0];
    //   this.curacao = locations[1];
    //   console.log('netherlands: ', this.netherlands);
    //   console.log('curacao: ', this.curacao);

    //   locations.forEach(location => {
    //     this.mapData(this.dataConfirmed, location.province, location.latest.confirmed);
    //     this.mapData(this.dataDeaths, location.province, location.latest.deaths);
    //     this.mapData(this.dataRecovered, location.province, location.latest.recovered);
    //   });
    // });

    this.getLocations();
    this.getLatest();
  }

  private getLatest(): void {
    this.apiService.getLatest().pipe(take(1)).subscribe(response => {
      const latest: Latest = response.latest;
      this.mapData(this.dataTotal, 'Confirmed', latest.confirmed);
      this.mapData(this.dataTotal, 'Deaths', latest.deaths);
      this.mapData(this.dataTotal, 'Recovered', latest.recovered);
    });
  }

  private getLocations(): void {
    this.apiService.getLocations().pipe(take(1)).subscribe(response => {
      const locations: Location[] = response.locations;
      locations.forEach((location: Location) => {
        this.mapData(this.dataConfirmed, this.isProvince(location), location.latest.confirmed);
        this.mapData(this.dataDeaths, this.isProvince(location), location.latest.deaths);
        this.mapData(this.dataRecovered, this.isProvince(location), location.latest.recovered);
      });
    });
  }

  private isProvince(location: Location): string {
    return location.province !== '' ? location.province : location.country;
  }

  private mapData(data: DataFormat[], name: string, value: number): void {
    data.push({ name, value })
  }
}
