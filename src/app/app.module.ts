import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DataCatalogueComponent } from './data-catalogue/data-catalogue.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import { DataMapComponent } from './data-map/data-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    DataCatalogueComponent,
    DataDetailsComponent,
    DataMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
