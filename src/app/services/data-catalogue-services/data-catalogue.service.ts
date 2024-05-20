import { Injectable, Injector} from '@angular/core';
import { CommonService } from '../common.service';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { ServiceUri } from 'src/app/models/serviceUri';

@Injectable({
  providedIn: 'root',
})

export class DataCatalogueService {
  choosen_lst: any = [];
  constructor(
    http: HttpClient,
     _commonService: CommonService,
     public _baseService: BaseService,
     public serviceUri: ServiceUri,
  ) {}

  // Landsat
  getDataLandsat(): Promise<any>{
    const gridInfo = {
      filters: [],
      pageInfo: {
        page: 1, // Hiển thị ở trang 1
        pageSize: 60, //Hiển thị số phần tử sẽ hiện ra
      },
      sorts: [
        {
          field: '',
          dir: 0,
        },
      ],
    };
    return this._baseService.getData(gridInfo, this.serviceUri.LandsatUri);
  }
  getDataLandsatById(id: any):Promise<any> {
    return this._baseService.getById(id, this.serviceUri.LandsatUri);
  }

  // LandCover
  getDataLandCover(): Promise<any>{
    const gridInfo = {
      filters: [],
      pageInfo: {
        page: 1, // Hiển thị ở trang 1
        pageSize: 60, //Hiển thị số phần tử sẽ hiện ra
      },
      sorts: [
        {
          field: '',
          dir: 0,
        },
      ],
    };
    return this._baseService.getData(gridInfo, this.serviceUri.LandCoverUri);
  }

  getDataLandCoverById(id: any):Promise<any> {
    return this._baseService.getById(id, this.serviceUri.LandCoverUri);
  }

  getDataSentinel(): Promise<any>{
    const gridInfo = {
      filters: [],
      pageInfo: {
        page: 1, // Hiển thị ở trang 1
        pageSize: 60, //Hiển thị số phần tử sẽ hiện ra
      },
      sorts: [
        {
          field: '',
          dir: 0,
        },
      ],
    };
    return this._baseService.getData(gridInfo, this.serviceUri.SentinelUri);
  }

  getDataSentinelById(id: any):Promise<any> {
    return this._baseService.getById(id, this.serviceUri.SentinelUri);
  }
}
