import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SliderModule} from 'primeng/slider';
import {ScrollerModule} from 'primeng/scroller';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar'
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

// Components
import { AppComponent } from './app.component';
import { AppGuideComponent } from './app-guide/app-guide.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DataCatalogueComponent } from './data-catalogue/data-catalogue.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import { DataMapComponent } from './data-map/data-map.component';
import { PreviewMapComponent } from './preview-map/preview-map.component';

// Service
import { ConfirmationService, MessageService } from 'primeng/api';

// Models
import { MapTypeLists } from './models/map-types';

@NgModule({
  declarations: [
    AppComponent,
    AppGuideComponent,
    LeftMenuComponent,
    DataCatalogueComponent,
    DataDetailsComponent,
    DataMapComponent,
    PreviewMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    SliderModule,
    FormsModule,
    ScrollerModule,
    PerfectScrollbarModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    TimelineModule,
    ToastModule,
    CalendarModule,
    ConfirmDialogModule,
  ],
  providers: [MapTypeLists, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
