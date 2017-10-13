import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { EsriLoaderService } from '../../services/esri-loader.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, OnDestroy {

  private map: __esri.Map;
  private mapView: __esri.MapView;

  @Output() mouseMove = new EventEmitter<__esri.Point>();

  @Input()
  set center(newCenter: __esri.Point) {
    console.log(newCenter)
    if (this.mapView) {
      this.mapView.set('center', newCenter);
    }
  }

  @Output() centerChange = new EventEmitter<__esri.Point>();

  @ViewChild('mapNode') private mapViewEl: ElementRef;

  private watchHandles: __esri.WatchHandle[] = [];

  constructor(private esriLoaderSvc: EsriLoaderService) {}

  async ngOnInit() {
    // Load modules
    const [Map, MapView]: [__esri.MapConstructor, __esri.MapViewConstructor] =
      await this.esriLoaderSvc.require('esri/Map', 'esri/views/MapView');

    const mapProperties = {
      basemap: 'streets-night-vector'
    };

    this.map = new Map(<__esri.MapProperties>mapProperties);

    this.mapView = new MapView({
      map: this.map,
      container: this.mapViewEl.nativeElement
    });

    this.wireEvents();
  }

  ngOnDestroy() {
    this.watchHandles.forEach(handle => {
      handle.remove();
    });
  }

  private wireEvents() {
    this.mapView.on('pointer-move', (evt) => {
      const point = this.mapView.toMap({
        x: evt.x,
        y: evt.y
      });

      this.mouseMove.emit(point);
    });

    const centerHandle = this.mapView.watch('center', (newCenter: __esri.Point) => {
      this.centerChange.emit(newCenter);
    });

    this.watchHandles.push(centerHandle);
  }
}
