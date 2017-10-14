import { Component, OnInit, Input, Output, ElementRef, ViewChild, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { EsriLoaderService } from '../../services/esri-loader.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {

  private map: __esri.Map;
  private mapView: __esri.MapView;
  private watchHandles: __esri.WatchHandle[] = [];
  private eventHandles: IHandle[] = [];

  @Input() layers: __esri.Layer[] = [];

  @Output() pointerMove = new EventEmitter<__esri.Point>();
  @Output() pointerDown = new EventEmitter<__esri.Point>();
  @Output() centerChange = new EventEmitter<__esri.Point>();

  @ViewChild('mapNode') private mapViewEl: ElementRef;

  constructor(private esriLoaderSvc: EsriLoaderService) {}

  async ngOnInit() {
    // Load map and mapview modules
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
    this.eventHandles.forEach(handle => handle.remove());
    this.watchHandles.forEach(handle => handle.remove());
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  private wireEvents() {
    // Watch for pointer move events
    this.eventHandles.push(this.mapView.on('pointer-move', evt => {
      const point = this.mapView.toMap({
        x: evt.x,
        y: evt.y
      });

      this.pointerMove.emit(point);
    }));

    // Watch for pointer down events
    this.eventHandles.push(this.mapView.on('pointer-down', evt => {
      const point = this.mapView.toMap({
        x: evt.x,
        y: evt.y
      });

      this.pointerDown.emit(point);
    }));

    // Watch for changes in the center point of the map
    this.watchHandles.push(this.mapView.watch('center', (newCenter: __esri.Point) => {
      this.centerChange.emit(newCenter);
    }));
  }
}
