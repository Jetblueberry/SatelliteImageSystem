import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';

@Component({
  selector: 'app-data-catalogue',
  templateUrl: './data-catalogue.component.html',
  styleUrls: ['./data-catalogue.component.scss']
})
export class DataCatalogueComponent {
  displayLandsatData = false;

  constructor(
    private _dataMapService: DataMapService
  ) {}

  closeDataCatalogue() {
    this._dataMapService.showCatalogue = false;
  }

  OpenCloseLandSatData() {
    var i = document.getElementById("landsat-icon");
    if(i) {
      if(!this.displayLandsatData ) {
        this.displayLandsatData = true;
        i.style.transform = "rotate(180deg)";
        i.style.transition = "transform 0.8s ease";
      } else {
        this.displayLandsatData = false;
        i.style.transform = "rotate(0deg)";
        i.style.transition = "transform 0.8s ease";
      }
    }

  }
}
