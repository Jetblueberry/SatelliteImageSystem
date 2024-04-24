import { Injectable, Injector} from '@angular/core';
import { CommonService } from '../common.service';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class DataCatalogueService extends BaseService {
  choosen_lst: any = [];
  override serviceUri = 'https://localhost:7021/api/DataLandsat';
  constructor(http: HttpClient, _commonService: CommonService) {
    super(http, _commonService);
  }

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
    return this.getData(gridInfo);
  }

  getDataLandsatById(id: any):Promise<any> {
    return this.getById(id);
  }
}
