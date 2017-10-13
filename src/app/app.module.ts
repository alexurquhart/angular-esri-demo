import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { ArcgisModule } from './modules/arcgis/arcgis.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsService } from './services/settings.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ArcgisModule
  ],
  providers: [
    SettingsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
