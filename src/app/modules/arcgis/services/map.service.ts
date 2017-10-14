import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MapService {

  private _layers = new BehaviorSubject<__esri.Layer[]>([]);
  public layers = this._layers.asObservable();

  private _map: __esri.Map;

  get map(): __esri.Map {
    return this._map;
  }

  constructor() { }

  addLayer(layer: __esri.Layer) {
    const layers = this._layers.getValue();
    layers.push(layer);
    this._layers.next(layers);
  }

  removeLayer() {
    
  }
}
