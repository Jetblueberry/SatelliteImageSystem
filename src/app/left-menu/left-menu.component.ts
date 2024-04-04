import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  openCatalogue = false;

  opacityValue: number = 100;

  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
  ) {}
  OpenDataCatalogue() {
    this.openCatalogue = true;
    this._dataMapService.displayZoom = false;
  }
  closeDataCatalogue(closeCatalogue: any) {
    this.openCatalogue = closeCatalogue;
    this._dataMapService.displayZoom = true;
  }
}
