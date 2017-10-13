import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriLoaderService } from './services/esri-loader.service';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
  ],
  providers: [
    EsriLoaderService
  ]
})
export class ArcgisModule { }
