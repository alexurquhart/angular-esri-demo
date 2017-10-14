import { Component } from '@angular/core';
import { MapPointService } from './services/map-point.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private mapPointSvc: MapPointService) {}

  click(point: __esri.Point) {
    this.mapPointSvc.addPoint(point);
    console.log(this.mapPointSvc)
  }
}
