import { Component } from '@angular/core';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import {landsat_data} from '../data/landsat_data';
import {sentinel_data} from '../data/sentinel_data'

@Component({
  selector: 'app-data-catalogue',
  templateUrl: './data-catalogue.component.html',
  styleUrls: ['./data-catalogue.component.scss']
})
export class DataCatalogueComponent {
  displayData: any = {};
  landsat_lst: any = [];
  sentinel_lst: any = [];
  total_lst: any = [];

  constructor(
    private _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService
  ) {}

  ngOnInit() {
    this.getDatasetList();
  }

  getDatasetList() {
    this.landsat_lst = landsat_data.landsat_data_lists;
    this.sentinel_lst = sentinel_data.sentinel_data_lists;
    this.total_lst = this.landsat_lst.concat(this.sentinel_lst);
  }

  closeDataCatalogue() {
    this._dataCatalogueService.showCatalogue = false;
  }

  OpenCloseLandSatData(type: any) {
    var i = document.getElementById(`${type}-icon`);
    if(i) {
      if(!this.displayData[type]) {
        this.displayData[type] = true;
        i.style.transform = "rotate(180deg)";
        i.style.transition = "transform 0.8s ease";
      } else {
        this.displayData[type] = false;
        i.style.transform = "rotate(0deg)";
        i.style.transition = "transform 0.8s ease";
      }
    }
  }

  selectDataset(idData: any) {
    for(const item of this.total_lst) {
      if(item.id == idData) {
        this._dataDetailsService.lstDataChoosen.push(item);
      }
    }
    this._dataCatalogueService.showCatalogue = false;
    this._dataDetailsService.showDetails = true;
  }
}
