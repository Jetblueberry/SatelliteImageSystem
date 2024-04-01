import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SliderModule} from 'primeng/slider';
import {ScrollerModule} from 'primeng/scroller';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar'
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DataCatalogueComponent } from './data-catalogue/data-catalogue.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import { DataMapComponent } from './data-map/data-map.component';
import { MapTypeLists } from './models/map-types';

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
    AppRoutingModule,
    SliderModule,
    FormsModule,
    ScrollerModule,
    PerfectScrollbarModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [MapTypeLists],
  bootstrap: [AppComponent]
})
export class AppModule { }
