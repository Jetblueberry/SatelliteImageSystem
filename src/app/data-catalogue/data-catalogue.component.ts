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

  list_landsat: any = [];
  list_sentinel: any = [];
  list_total_data: any = [];
  list_search_data: any = [];
  lsd: any;
  mymap: any;
  openDetails = false;
  openPreview = false;
  openSearchList = false;

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

  async ngOnInit() {
    this.getDatasetList();
    await this.getDataLandsatList();
    await this.getTotalDataList();
  }

  // Data List
  getDatasetList() {
    this.landsat_lst = landsat_data.landsat_data_lists;
    this.sentinel_lst = sentinel_data.sentinel_data_lists;
    this.total_lst = this.landsat_lst.concat(this.sentinel_lst);
  }

  async getDataLandsatList() {
    const result = await this._dataCatalogueService.getDataLandsat();
    if(result) {
      this.list_landsat = result;
    }
  }
  async getTotalDataList() {
    this.list_total_data = this.list_landsat.concat(this.sentinel_lst);
    console.warn(this.list_total_data)
  }

  // Functional
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

  async addDatasetToMap(idData: any) {
    // Khởi tạo các prop cần truyền từ những dữ liệu lấy trong bảng
    const item = await this._dataCatalogueService.getDataLandsatById(idData);
    item.displayName = item.tenData; // set displayName when add details
    this._dataDetailsService.opacityValue[item.displayName] = 100; // set opacity when add details

    this._dataCatalogueService.choosen_lst.push(item); // add in lst
    this._dataMapService.AddDataToMap(item.tenData, item.listStyles[0]);

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

  // Search
  async searchData(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const value = element.value
      if(value.length > 0) {
        this.openSearchList = true;
        this.searchDataList(value);
      }
      else {
        this.openSearchList = false;
        this.list_search_data.length = 0;
      }

    }
  }
  async searchDataList(query: string) {
    this.list_search_data.length = 0;
    for (let i = 0; i < this.list_total_data.length; i++) {
      if (this.list_total_data[i].tenData.substring(0, query.length).toLocaleLowerCase() === query.toLocaleLowerCase())
      {
        //So sánh chuỗi nhập vào với tên sản phẩm
        this.list_search_data.push(this.list_total_data[i]);
      }
    }
  }
}
