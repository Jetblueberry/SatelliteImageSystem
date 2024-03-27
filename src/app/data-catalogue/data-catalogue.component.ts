import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import {landsat_data} from '../data/landsat_data';
import {sentinel_data} from '../data/sentinel_data'
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';

@Component({
  selector: 'app-data-catalogue',
  templateUrl: './data-catalogue.component.html',
  styleUrls: ['./data-catalogue.component.scss']
})
export class DataCatalogueComponent {
  @Input() openCatalogue: any;
  @Output() closeCatalogue = new EventEmitter<any>;

  list: any = [];
  lsd: any;
  displayDetails = false;

  displayData: any = {};
  landsat_lst: any = [];
  sentinel_lst: any = [];
  total_lst: any = [];
  choosen_lst: any = [];

  constructor(
    private _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
  ) {}

  ngOnInit() {
    this.getDatasetList();
    this.getDataLandsatList();
  }

  getDatasetList() {
    this.landsat_lst = landsat_data.landsat_data_lists;
    this.sentinel_lst = sentinel_data.sentinel_data_lists;
    this.total_lst = this.landsat_lst.concat(this.sentinel_lst);
  }

  async getDataLandsatList() {
    const result = await this._dataCatalogueService.getDataLandsat();
    if(result) {
      this.list = result;
    }
  }

  closeDataCatalogue() {
    this.closeCatalogue.emit(false);
  }

  // Left catalogue list
  OpenCloseListData(type: any) {
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

  // Right catalogue preview
  OpenClosePreviewInfo(type: any) {
    var i = document.getElementById(`${type}-icon`);
    if(i) {
      if(this.displayData[type]) {
        this.displayData[type] = false;
        i.style.transform = "rotate(0deg)";
        i.style.transition = "transform 0.3s ease";
      } else {
        this.displayData[type] = true;
        i.style.transform = "rotate(-90deg)";
        i.style.transition = "transform 0.3s ease";
      }
    }
  }

  addDatasetToMap(idData: any) {
    for(const item of this.total_lst) {
      if(item.id == idData) {
        this.choosen_lst.push(item);
      }
    }
    this._dataMapService.showLayerMap = true;

    this.closeCatalogue.emit(false);
    this.displayDetails = true;
  }

  async selectDataset(idData: any) {
    this.lsd = await this._dataCatalogueService.getDataLandsatById(idData);
  }
}
