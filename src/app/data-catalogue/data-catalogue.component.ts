import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import {landsat_data} from '../data/landsat_data';
import {sentinel_data} from '../data/sentinel_data';
import { DataMapService } from '../services/data-map-services/data-map.service';
import * as L from 'leaflet';
import { MapTypeLists } from '../models/map-types';
import { MessagesService } from '../services/message.service';

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
  mymap: any;
  openDetails = false;
  openPreview = false;

  displayData: any = {};
  displayMinusIcon: any = {};
  landsat_lst: any = [];
  sentinel_lst: any = [];
  total_lst: any = [];


  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
    public mapTypesLists: MapTypeLists,
    public messageService: MessagesService
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
    this.openCatalogue = false;
  }
  openDataCatalogue(openCatalogue: any) {
    this.openCatalogue = openCatalogue;
  }
  closeDataDetails(closeDetails: any) {
    this.openDetails = closeDetails;
    this._dataCatalogueService.choosen_lst = [];
    this.displayMinusIcon = {};
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

  async addDatasetToMap(idData: any) { // OpenDataDetails
    const item = await this._dataCatalogueService.getDataLandsatById(idData);
    this._dataCatalogueService.choosen_lst.push(item);
    item.displayName = item.tenData;

    this._dataMapService.AddDataToMap(item.tenData);

    this.closeCatalogue.emit(false);
    this.displayMinusIcon[idData] = true;
    this.openDetails = true;
    setTimeout(async () => {
      await this.messageService.addMessageSuccessAdding();
    }, 500);

  }

  async selectDataset(idData: any) {
    this.lsd = await this._dataCatalogueService.getDataLandsatById(idData);
    this.openPreview = true;
    this.displayData['landsat'] = true;
  }
}
