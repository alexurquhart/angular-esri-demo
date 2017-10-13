import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { ArcgisModule } from './modules/arcgis/arcgis.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ArcgisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
