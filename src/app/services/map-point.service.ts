import { Injectable } from '@angular/core';
import { EsriLoaderService } from '../modules/arcgis/services/esri-loader.service';

@Injectable()
export class MapPointService {

  private _layer: __esri.FeatureLayer;

  get layer() { return this._layer; }

  constructor(private esriLoaderSvc: EsriLoaderService) {
    this.createLayer();
  }

  // Create the feature layer
  private async createLayer() {
    const [FeatureLayer]: [ __esri.FeatureLayerConstructor] =
       await this.esriLoaderSvc.require('esri/layers/FeatureLayer');

    this._layer = new FeatureLayer({
      fields: [{
        name: 'id',
        type: 'oid'
      },
      {
        name: 'label',
        type: 'number',
        alias: 'Label'
      }],
      objectIdField: 'id',
      geometryType: 'point',
      spatialReference: { wkid: 4326 },
      source: [],
      renderer: <__esri.RendererProperties>{
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          size: 25,
          color: 'black'
        },
        label: 'Points'
      }
    });
  }

  public addToMap(map: __esri.Map) {
    map.add(this._layer);
  }

  public async addPoint(point: __esri.Point) {
    const [Graphic]: [__esri.GraphicConstructor] = await this.esriLoaderSvc.require('esri/Graphic');

    // Find the ID to assign to the point
    let id = 0;
    if (this._layer.source.length > 0) {
      const lastPoint = this._layer.source.getItemAt(this._layer.source.length - 1);
      id = lastPoint.attributes.id + 1;
    }

    // Create a new graphic
    const graphic = new Graphic({
      geometry: point,
      attributes: {
        id: id,
        label: id + 1
      }
    });

    this._layer.source.add(graphic);
  }

}
